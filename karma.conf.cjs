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
      jsx: "automatic"
    },

    browsers: ["ChromeHeadless"],

    singleRun: true,

    reporters: ["progress"]
  });
};