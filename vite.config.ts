import { defineConfig } from "vite";
import { resolve } from "node:path";

import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";

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
	plugins: [vue()],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "./index.html"),
				console: resolve(__dirname, "./src/modules/console/index.html"),
				recruitment: resolve(__dirname, "./src/modules/recruitment/index.html"),
			},
		},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
			"@console": resolve(__dirname, "./src/modules/console"),
			"@recruitment": resolve(__dirname, "./src/modules/recruitment"),
		},
	},
});
