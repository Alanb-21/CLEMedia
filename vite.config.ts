import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep the admin panel out of the public bundle.
          if (id.includes("/src/pages/admin/")) return "admin";
          if (id.includes("node_modules/@supabase")) return "supabase";
        },
      },
    },
  },
});
