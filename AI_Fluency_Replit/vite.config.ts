import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
  ],
  base: process.env.NODE_ENV === 'production' ? '/' : '/', // Set base path for GitHub Pages
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, "client", "index.html"),
        test: path.resolve(import.meta.dirname, "client", "static-test.html")
      }
    },
    assetsDir: "assets",
    assetsInlineLimit: 4096,
    cssCodeSplit: false,
    minify: true,
    sourcemap: false
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
