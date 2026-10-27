import fs from 'node:fs';
import path from 'node:path';
import { generate } from 'selfsigned';
import { lanAddresses, rootDir } from './config';

export interface TlsFiles {
  key: string;
  cert: string;
}

/**
 * Self-signed certificate for the local network. Phones need HTTPS for mic, camera and motion.
 * Stored in certs/ (git-ignored) and regenerated when this machine's LAN addresses change.
 */
export async function ensureCert(dir = path.join(rootDir, 'certs')): Promise<TlsFiles> {
  const ips = ['127.0.0.1', ...lanAddresses()];
  const keyFile = path.join(dir, 'key.pem');
  const certFile = path.join(dir, 'cert.pem');
  const metaFile = path.join(dir, 'ips.json');

  const upToDate =
    fs.existsSync(keyFile) &&
    fs.existsSync(certFile) &&
    fs.existsSync(metaFile) &&
    JSON.stringify(JSON.parse(fs.readFileSync(metaFile, 'utf8'))) === JSON.stringify(ips);
  if (upToDate)
    return { key: fs.readFileSync(keyFile, 'utf8'), cert: fs.readFileSync(certFile, 'utf8') };

  const notAfterDate = new Date(Date.now() + 365 * 24 * 3600 * 1000);
  const pems = await generate([{ name: 'commonName', value: 'The Murley Show' }], {
    keySize: 2048,
    algorithm: 'sha256',
    notAfterDate,
    extensions: [
      { name: 'basicConstraints', cA: false },
      { name: 'keyUsage', digitalSignature: true, keyEncipherment: true },
      { name: 'extKeyUsage', serverAuth: true },
      {
        name: 'subjectAltName',
        altNames: [{ type: 2, value: 'localhost' }, ...ips.map((ip) => ({ type: 7 as const, ip }))],
      },
    ],
  });
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(keyFile, pems.private);
  fs.writeFileSync(certFile, pems.cert);
  fs.writeFileSync(metaFile, JSON.stringify(ips));
  return { key: pems.private, cert: pems.cert };
}
