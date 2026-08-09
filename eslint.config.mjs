import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored pdf.js worker, copied from pdfjs-dist and shipped as-is. It is
    // third-party minified output, so linting it produces thousands of
    // meaningless warnings and no actionable signal.
    "public/pdfjs/**",
  ]),
]);

export default eslintConfig;
