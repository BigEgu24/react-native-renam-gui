const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackObfuscator = require("webpack-obfuscator");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
// require("@babel/polyfill");

module.exports = {
  entry: ["./src/index.js"],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name][contenthash].js",
  },
  plugins: [
    new webpack.EnvironmentPlugin({ JEST_WORKER_ID: null }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      __DEV__: process.env.NODE_ENV !== "production" || true,
    }),
    new ReactRefreshWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new WebpackObfuscator ({
    //   rotateStringArray: false
    // }, ['app_bundle.js']),
    new webpack.ProvidePlugin({
      process: "process/browser.js",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/images",
          to: "images",
        },
        {
          from: "./public/manifest.json",
          to: "manifest.json",
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          outputPath: "images",
          esModule: false,
        },
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                {
                  plugins: [
                    "@babel/plugin-proposal-class-properties",
                  ],
                },
              ],
            },
          },
        ],
      },
      // {
      //   test: /\.js$/,
      //   enforce: 'post',
      //   use: [
      //     {
      //       loader: WebpackObfuscator.loader,
      //       options: {
      //         rotateStringArray: false,
      //       }
      //     }
      //   ],
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".web.js", ".js", ".jsx", ".json"],
  },
};
