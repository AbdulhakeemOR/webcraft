import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Relative asset paths support deployments beneath a subdirectory.
  base: "./",

  server: {
    port: 5173,
  },

  preview: {
    port: 4173,
  },

  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
