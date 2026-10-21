
module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],

    files: [
      "tests/productos.spec.js"
    ],

    preprocessors: {
      "tests/productos.spec.js": ["esbuild"]
    },

    esbuild: {
      target: "es2020",
      bundle: true,
      format: "iife",
      platform: "browser"
    },

    browsers: ["ChromeHeadless"],
    singleRun: true,
    reporters: ["progress"]
  });
};
