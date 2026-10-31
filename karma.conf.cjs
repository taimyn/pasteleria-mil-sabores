const { esbuildPluginIstanbul } = require("esbuild-plugin-istanbul");

module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],

    files: [
      "tests/*.spec.js"
    ],

    preprocessors: {
      "tests/*.spec.js": ["esbuild"]
    },

    esbuild: {
      target: "es2020",
      bundle: true,
      format: "iife",
      platform: "browser",

      loader: {
        ".js": "jsx",
        ".jsx": "jsx"
      },

      jsx: "automatic",

      plugins: [
        esbuildPluginIstanbul({
          name: "istanbul-coverage",
          filter: /src[\\/].*\.(js|jsx)$/,
          loader: "jsx"
        })
      ]
    },

    browsers: ["ChromeHeadless"],

    singleRun: true,

    reporters: ["progress", "coverage"],

    coverageReporter: {
      dir: "coverage",
      reporters: [
        { type: "text-summary" },
        { type: "html", subdir: "html" }
      ]
    }
  });
};