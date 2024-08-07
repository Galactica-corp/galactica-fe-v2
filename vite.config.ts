import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import { checker } from "vite-plugin-checker";
import removeConsole from "vite-plugin-remove-console";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  const isDev = mode === "development";

  const env = loadEnv(mode, process.cwd(), "");

  return {
    build: {
      sourcemap: true,
    },
    plugins: [
      react(),
      svgr(),
      tsconfigPaths(),
      // isProd && removeConsole(),
      isDev &&
        checker({
          eslint: {
            lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
          },
          overlay: {
            initialIsOpen: false,
          },
          typescript: true,
        }),
    ],
    server: {
      proxy: {
        [`${env.VITE_QUEST_SERVICE}`]: {
          target: "https://quest-service.galactica.com",
          changeOrigin: true,
          // headers: env.VITE_QUEST_SERVICE_AUTH_TOKEN
          //   ? {
          //       Authorization: `Bearer ${env.VITE_QUEST_SERVICE_AUTH_TOKEN}`,
          //     }
          //   : {},
          rewrite: (path) => path.replace(/^\/quest-api/, ""),
        },
        "/quest-ws": {
          target: "wss://quest-service.galactica.com",
          changeOrigin: true,
          // headers: env.VITE_QUEST_SERVICE_AUTH_TOKEN
          //   ? {
          //       Authorization: `Bearer ${env.VITE_QUEST_SERVICE_AUTH_TOKEN}`,
          //     }
          //   : {},
          rewrite: (path) => path.replace(/^\/quest-ws/, ""),
        },
      },
    },
    resolve: {
      alias: process.env.PROFILER
        ? [
            { find: /^react-dom$/, replacement: "react-dom/profiling" },
            {
              find: "scheduler/tracing",
              replacement: "scheduler/tracing-profiling",
            },
          ]
        : [],
    },
  };
});
