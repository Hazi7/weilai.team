import eslintConfigPrettier from "eslint-config-prettier";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

export default [
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/recommended"],
    {
        files: ["*.vue", "**/*.vue"],
        languageOptions: {
            parserOptions: {
                parser: "@typescript-eslint/parser",
            },
        },
    },
    eslintConfigPrettier,
    {
        ignores: ["dist/**/*/", "src/components/ui/**/*/"],
    },
];
