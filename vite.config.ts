import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsconfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      srcDirectory: "src",
    }),
    nitroV2Plugin({
      preset: "node-server",
      nitro: {
        compatibilityDate: "2025-11-11",
      },
    }) as any,
    react({
      // babel: {
      //   plugins: [['babel-plugin-react-compiler']],
      // },
    }),
    tailwindcss(),
  ],
});
