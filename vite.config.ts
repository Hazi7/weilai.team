import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "node:path";

export default defineConfig({
	plugins: [vue()],
	build: {
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, "./index.html"),
				console: path.resolve(__dirname, "./src/modules/console/index.html"),
				recruitment: path.resolve(
					__dirname,
					"./src/modules/recruitment/index.html",
				),
			},
		},
	},
});
