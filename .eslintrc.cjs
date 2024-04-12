const path = require("path");

/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
  env: { browser: true, es2020: true },

  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:perfectionist/recommended-natural",
    "plugin:prettier/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "src/shared/graphql"],
  settings: {
    "import/resolver": {
      typescript: true,
    },

    tailwindcss: {
      callees: ["twMerge", "twJoin"],
      tag: ["tw"],
    },
    react: {
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "react",
    "import",
    "react-hooks",
    "@typescript-eslint",
    "react-refresh",
    "tailwindcss",
    "perfectionist",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        ".eslintrc.{js,cjs}",
        "tailwind.config.js",
        "postcss.config.cjs",
        "vite.config.ts",
        "codegen.ts",
      ],
      parserOptions: {
        project: path.join(__dirname, "tsconfig.node.json"),
        sourceType: "script",
      },
    },
  ],
  rules: {
    "import/no-default-export": ["error"],
    "import/namespace": ["error", { allowComputed: true }],
    "@typescript-eslint/no-unused-vars": ["warn", { varsIgnorePattern: "^_" }],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "perfectionist/sort-objects": "off",
    "perfectionist/sort-imports": [
      "error",
      {
        type: "natural",
        order: "asc",
        groups: [
          "type",
          "react",
          ["builtin", "external"],
          "internal-type",
          "internal",
          ["parent-type", "sibling-type", "index-type"],
          ["parent", "sibling", "index"],
          "side-effect",
          "style",
          "indexCss",
          "object",
          "unknown",
        ],
        "custom-groups": {
          value: {
            react: ["react", "react-*"],
            indexCss: ["./index.css"],
          },
          type: {
            react: "react",
            indexCss: "./index.css",
          },
        },
        "newlines-between": "always",
        "internal-pattern": [
          "entities/**",
          "features/**",
          "widgets/**",
          "pages/**",
          "shared/**",
          "app/**",
        ],
      },
    ],
  },
};
