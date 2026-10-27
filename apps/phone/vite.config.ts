import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const publicPort = Number(process.env.PORT ?? 8443);

// Served under /p/ so it can share one origin with the TV app. The server maps /join and /play to it.
export default defineConfig({
  base: '/p/',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: Number(process.env.PHONE_DEV_PORT ?? 5174),
    strictPort: true,
    allowedHosts: true,
    hmr: { clientPort: publicPort },
  },
});
