var path = require('path');
const webpack = require('webpack');

const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    main: "./src/client/js"
  },
  mode: "production",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  devServer: {
    contentBase: "dist",
    overlay: true,
    hot: true
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: { minimize: true }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
    plugins: [
      new HtmlWebPackPlugin({
        template: "src/index.html",
        filename: "./index.html"
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
}
