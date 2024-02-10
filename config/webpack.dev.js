const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

const devConfig = {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    static: path.join(__dirname, "dist"), // Specify the directory to serve static files
    port: 8000,
  },
  devtool: "eval-source-map",
};
module.exports = merge(common, devConfig);
