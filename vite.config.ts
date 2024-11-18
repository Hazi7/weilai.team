import Vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import { resolve } from "node:path";
import tailwind from "tailwindcss";
import VueRouter from "unplugin-vue-router/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        VueRouter({
            routesFolder: [
                "src/pages",
                {
                    src: "src/features/admin/pages",
                    path: "admin/",
                },
                {
                    src: "src/features/community/pages",
                    path: "community/",
                },
                {
                    src: "src/features/personalCenter/pages",
                    path: "personalCenter/",
                },
                {
                    src: "src/features/login/pages",
                    path: "login/",
                },
                {
                    src: "src/features/application/pages",
                    path: "application/",
                },
            ],
        }),
        Vue(),
    ],
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
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
});
