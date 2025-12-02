import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    proxy: {
      "/api/v1/usuarios": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
      },
      "/api/v1/productos": {
        target: "http://localhost:8082",
        changeOrigin: true,
        secure: false,
      }
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});