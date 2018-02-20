const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  // set this to your entry point
  entry: "./src/index.js",
  // change this to your output path
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }, 

  // create a map file for debugging
  devtool: 'source-map',

  // configure the loaders
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react'],
          compact: false
        }
      },
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        query: {
          presets: ['es2015', 'react'],
          compact: false
        } 
      },
      {
        test: /.css?$/,
        loader: "ignore-loader",
        query: {
          compact: false
        }
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"]    
  },
  plugins: [
    new UglifyJsPlugin()
  ],
  ///////////  uncomment this for production ////////////////
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   }),
  //   new webpack.DefinePlugin({
  //     'process.env': {'NODE_ENV': JSON.stringify('production')}
  //   })
  // ],////////////////////////////////////////////////////////

  watch: true // change this to true to keep webpack running
};

