import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

const host = process.env.TAURI_DEV_HOST;

export default defineConfig(async ({ command, mode }) => {


  const env = loadEnv(mode, process.cwd(), 'ALTEREM_');
  const port = parseInt(env.ALTEREM_PORT || '1420', 10);

  return {
    envPrefix: "ALTEREM_",
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    clearScreen: false,
    server: {
      port,
      strictPort: true,
      host: host || false,
      hmr: host
        ? {
          protocol: "ws",
          host,
          port: 1421,
        }
        : undefined,
      watch: {
        ignored: ["**/src-tauri/**"],
      },
    },
  }
});
