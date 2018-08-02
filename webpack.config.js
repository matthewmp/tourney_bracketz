var path = require('path');

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
    contentBase: "dist"
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
}
