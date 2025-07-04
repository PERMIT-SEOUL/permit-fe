import pluginPrettier from "eslint-plugin-prettier";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import pluginTurbo from "eslint-plugin-turbo";
import pluginReactRefresh from "eslint-plugin-react-refresh";

/** @type {import("eslint").Linter.FlatConfig} */
export const config = [
  {
    plugins: {
      prettier: pluginPrettier,
      "simple-import-sort": pluginSimpleImportSort,
      turbo: pluginTurbo,
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^node:"],
            ["^react", "^next", "^@?\\w"],
            ["^@permit/", "^@shared/", "^@/"],
            ["^\\u0000"],
            ["^\\."],
            ["^.+\\.css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "comma-dangle": ["error", "always-multiline"],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "*" },
        { blankLine: "any", prev: "import", next: "import" },
        { blankLine: "any", prev: ["const", "let"], next: ["const", "let"] },
        { blankLine: "any", prev: "expression", next: "expression" },
        { blankLine: "any", prev: "export", next: "export" },
      ],
    },
  },
];
