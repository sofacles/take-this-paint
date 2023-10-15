import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: "../server/public",
  server: {
    proxy: {
      "/api/health": "http://localhost:8888/",
      "/api/paints": "http://localhost:8888/",
      "/api/login": "http://localhost:8888/",
    },
  },
});
