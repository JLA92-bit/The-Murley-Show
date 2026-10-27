// Runs the server, TV app and phone app together. The server prints the LAN URLs.
import { spawn } from 'node:child_process';

const procs = [
  ['server', ['--filter', '@murley/server', 'dev'], '\x1b[35m'],
  ['tv    ', ['--filter', '@murley/tv', 'dev'], '\x1b[36m'],
  ['phone ', ['--filter', '@murley/phone', 'dev'], '\x1b[33m'],
].map(([name, args, colour]) => {
  const child = spawn('pnpm', args, { stdio: ['ignore', 'pipe', 'pipe'], env: process.env });
  const prefix = (chunk) =>
    String(chunk)
      .split('\n')
      .filter((l) => l.trim() !== '')
      .map((l) => `${colour}[${name}]\x1b[0m ${l}`)
      .join('\n') + '\n';
  child.stdout.on('data', (d) => process.stdout.write(prefix(d)));
  child.stderr.on('data', (d) => process.stderr.write(prefix(d)));
  child.on('exit', (code) => {
    if (!stopping) {
      console.error(`[${name.trim()}] exited with code ${code}. Stopping everything.`);
      stop(code ?? 1);
    }
  });
  return child;
});

let stopping = false;
function stop(code = 0) {
  stopping = true;
  for (const p of procs) p.kill('SIGTERM');
  setTimeout(() => process.exit(code), 500);
}
process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));
