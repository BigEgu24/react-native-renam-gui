const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

const prodConfig = {
  mode: "production",
  devtool: "source-map"
};
module.exports = merge(common, prodConfig);
