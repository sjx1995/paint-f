/*
 * @Description: vite config
 * @Author: Sunly
 * @Date: 2023-08-05 04:07:11
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueMacros from "unplugin-vue-macros/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variable.scss";`,
      },
    },
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
  plugins: [
    VueMacros({
      plugins: {
        vue: vue({
          include: [/\.vue$/, /\.setup\.[cm]?[jt]sx?$/],
          reactivityTransform: true,
          script: {
            // @ts-ignore
            hoistStatic: false,
          },
        }),
      },
    }),
  ],
});
