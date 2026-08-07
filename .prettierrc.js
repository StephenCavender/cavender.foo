/** @type {import("prettier").Config} */
export default {
  trailingComma: "es5",
  printWidth: 80,
  htmlWhitespaceSensitivity: "ignore",
  bracketSameLine: false,
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "**/*astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
