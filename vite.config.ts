import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 院内LAN内のタブレットからもアクセスできるよう host を有効化
export default defineConfig({
  // GitHub Pages のサブパス（username.github.io/リポジトリ名/）でも
  // アセットが読めるよう、相対パスで出力する。リポジトリ名に依存しない。
  base: "./",
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
});
