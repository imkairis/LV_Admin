import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      '__REACT_APP_HOST_IP__': JSON.stringify(env.REACT_APP_HOST_IP),
      '__REACT_APP_IMAGE_LINK__': JSON.stringify(env.REACT_APP_IMAGE_LINK),
      '__SERVER_API_PATH__': JSON.stringify(env.SERVER_API_PATH || '/v1'),
    },

    // server: {
    //   port: 5173,
    //   proxy: {
    //     '/': {
    //       target: env.REACT_APP_HOST_IP,
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/v1/, ''),
    //     },
    //   },
    // },

  };
});