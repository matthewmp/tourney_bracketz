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
        test: /\.js$/, // identify all js files
        exclude: /node_modules/, // excluding the node_modules dir
        use: "babel-loader" // use babel-loader for the transformation
      },
      {
        test: /\.html$/, // identify all html files
        use: {
          loader: "html-loader", // use html-loader for the transformation
          options: { attrs: ["img:src"] },
        }
      },
      {
        test: /\.pug$/, // identify all pug files
        use: "pug-html-loader" // use pug--html-loader for the transformation
      },
      {
        test: /\.css$/, // identify all css files
        use: ["style-loader", "css-loader", "postcss-loader"] // use these loaders for the transformation
      }
    ]
  },
    plugins: [
      // List each page/view to enable the build procedure to process them
      new webpack.HotModuleReplacementPlugin(),
      // I don't think these directives are not necessary because all PUG files are being handled above.
      // new HtmlWebPackPlugin({
      //   filename: 'index.pug',
      //   template: "src/views/index.pug"
      // }),
      // new HtmlWebPackPlugin({
      //   filename: 'userdashboard.pug',
      //   template: "src/views/userdashboard.pug"
      // })
    ]
}
