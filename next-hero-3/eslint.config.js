import { defineConfig } from "eslint/config";
import eslintConfigCodely from "eslint-config-codely";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";

export default defineConfig([
  ...eslintConfigCodely.full,
  {
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto", printWidth: 120, useTabs: false, tabWidth: 2 }],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "import/no-unresolved": "off",
      "import/no-duplicates": "off",
    },
  },
  {
    files: ["**/*.tsx"],
    plugins: {
      "better-tailwindcss": eslintPluginBetterTailwindcss,
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/app/global.css",
      },
    },
    rules: {
      // enable all recommended rules to warn
      ...eslintPluginBetterTailwindcss.configs["recommended-warn"].rules,
      // enable all recommended rules to error
      ...eslintPluginBetterTailwindcss.configs["recommended-error"].rules,
      "better-tailwindcss/no-unregistered-classes": "off",
      "better-tailwindcss/no-conflicting-classes": "off",
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/app/**/": "NEXT_JS_APP_ROUTER_CASE",
          "**/*": "+([a-z0-9-\\[\\]().])",
        },
      ],
    },
  },
]);
