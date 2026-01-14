import * as js from "@eslint/js";
import * as globals from "globals";
import tseslint from "typescript-eslint";
import {defineConfig, globalIgnores} from "eslint/config";

export default defineConfig([
    globalIgnores(["node_modules/**"]),
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: {js},
        extends: ["js/recommended"],
        languageOptions: {globals: globals.browser}
    },
    {
        rules: {
            "eqeqeq": "error",
            "quotes": "error",
            "eol-last": "error",
            "semi": "error",
            "indent": "error",
            "linebreak-style": "error",
            "prefer-const": "error",
            "no-unused-vars": "error",
        },
    },

    tseslint.configs.recommended,
]);
