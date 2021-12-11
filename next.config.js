// next.config.js
const withAntdLess = require("next-plugin-antd-less");
const withImages = require("next-images");

module.exports = withAntdLess(
  withImages({
    // optional
    modifyVars: { "@primary-color": "#1cacc8" },
    // optional
    lessVarsFilePath: "./src/styles/variables.less",
    // optional
    lessVarsFilePathAppendToEndOfContent: false,
    // optional https://github.com/webpack-contrib/css-loader#object
    cssLoaderOptions: {},

    // Other Config Here...

    webpack(config) {
      return config;
    },
  })
);
