import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const publicPort = Number(process.env.PORT ?? 8443);

// In dev the server on PORT proxies to this Vite server, so HMR must connect back through it.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: Number(process.env.TV_DEV_PORT ?? 5173),
    strictPort: true,
    allowedHosts: true,
    hmr: { clientPort: publicPort },
  },
});
