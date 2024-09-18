module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true,
        },
        modules: false, // Keep ES modules (don't transform to CommonJS)
      },
    ],
    "@babel/preset-typescript",
    ["@babel/preset-env", { targets: { node: "current" } }],
    [
      "@babel/preset-typescript",
      {
        jsxPragma: "h",
        jsxPragmaFrag: "Fragment",
      },
    ],
  ],
  plugins: [
    ["@babel/plugin-transform-runtime"],
    [
      "@babel/plugin-transform-react-jsx",
      {
        pragma: "h",
        pragmaFrag: "Fragment",
      },
    ],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ],
};
