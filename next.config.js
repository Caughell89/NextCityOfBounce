// next.config.js
const withAntdLess = require("next-plugin-antd-less");
const withImages = require("next-images");
module.exports = withImages();
module.exports = withAntdLess({
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

  future: {
    // if you use webpack5
    webpack5: true,
  },
});
