import https from 'node:https';
import path from 'node:path';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { events, type ServerStatus } from '@murley/shared';
import { createApp } from './app';
import { lanAddresses, loadConfig, rootDir } from './config';
import { ensureCert } from './tls';

dotenv.config({ path: path.join(rootDir, '.env') });

const config = loadConfig();
const tls = await ensureCert();
const { app, upgrade } = createApp(config);
const server = https.createServer(tls, app);

const io = new Server(server, { destroyUpgrade: false });
const roles = { tv: new Set<string>(), phone: new Set<string>() };

function broadcastStatus() {
  const status: ServerStatus = {
    ok: true,
    serverTime: Date.now(),
    tvs: roles.tv.size,
    phones: roles.phone.size,
  };
  io.emit(events.roomState, status);
}

io.on('connection', (socket) => {
  socket.on(events.tvReady, () => {
    roles.tv.add(socket.id);
    broadcastStatus();
  });
  socket.on(events.phoneHello, () => {
    roles.phone.add(socket.id);
    broadcastStatus();
  });
  socket.on('disconnect', () => {
    roles.tv.delete(socket.id);
    roles.phone.delete(socket.id);
    broadcastStatus();
  });
});

server.on('upgrade', upgrade);

server.listen(config.port, '0.0.0.0', () => {
  const line = '-'.repeat(60);
  const hosts = lanAddresses();
  console.log(
    `\n${line}\n  THE MURLEY SHOW! is running (${config.dev ? 'dev' : 'production'})\n${line}`,
  );
  console.log(`  Open on the TV:    https://${hosts[0] ?? 'localhost'}:${config.port}/`);
  console.log(`  Open on a phone:   https://${hosts[0] ?? 'localhost'}:${config.port}/join`);
  if (hosts.length > 1)
    console.log(
      `  Other addresses:   ${hosts
        .slice(1)
        .map((h) => `https://${h}:${config.port}`)
        .join('  ')}`,
    );
  console.log(`  QR codes will use: ${config.publicUrl}/join`);
  console.log('  First visit on each device: tap through the certificate warning.');
  console.log(`${line}\n`);
});
