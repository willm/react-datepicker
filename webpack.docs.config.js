var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    './docs-site/src/boot'
  ],
  output: {
    path: path.resolve('./docs-site/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],

    // Needed to direct the docs to the local version of the datepicker, this is not needed for
    // normal setup.
    alias: {
      'react-datepicker/dist/react-datepicker.css': path.resolve('./src/stylesheets/datepicker.scss'),
      'react-datepicker': path.resolve('./src/index.jsx')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        use: [
          { loader: 'babel-loader', options: {'exclude': /node_modules/} },
        ]
      },
      {
        test: /\.scss/,
        use: [
          { loader: 'style-loader', options: {'sass-loader': true} }
        ]
      },
      {
        test: /\.css/,
        use: [
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  node: { Buffer: false },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
