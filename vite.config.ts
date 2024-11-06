import { defineConfig } from "vite";
import { resolve } from "node:path";

import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import Pages from "vite-plugin-pages";

export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
            },
        },
    },
    plugins: [
        vue(),
        Pages({
            pagesDir: "src/pages",
            extensions: ["vue"],
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
});
