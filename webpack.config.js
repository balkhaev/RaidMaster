const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const path = require('path')

const ENV = process.argv.indexOf('-p') !== -1 ? 'production' : process.env.NODE_ENV || 'development'

const opts = {
  entries: ['babel-polyfill', './src/scripts/main.js', './src/styles/index.sass'],
  styleName: '[name].[hash].css',
  scriptName: '[name].[hash].js'
}

const extractSass = new ExtractTextPlugin({
  filename: opts.styleName,
  disable: ENV === "development"
})

function addMin(filename) {
  const parts = filename.split('.')
  parts.splice(parts.length - 1, 0, 'min')

  return parts.join('.')
}

if (ENV === 'production') {
  opts.styleName = addMin(opts.styleName)
  opts.filename = addMin(opts.scriptName)
}

const config = {
  devtool: ENV === 'development' ? 'source-map' : false,
  entry: {
    bundle: opts.entries
  },
  output: {
    filename: opts.scriptName,
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: extractSass.extract({
          use: ["css-loader", "sass-loader"],
          fallback: "style-loader"
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-async-to-generator']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        query: {
          name: 'assets/fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    extractSass,
    new HtmlWebpackPlugin({
      title: 'Balkhaev Page',
      filename: 'index.html',
      template: 'src/index.ejs',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin()
  ],
  resolve: {
    modules: [
      'node_modules',
      'src/scripts/'
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },
}

if (ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        unused: false
      }
    })
  )
}

if (ENV === 'development') {
  config.devServer = {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    historyApiFallback: {
      index: 'index.html'
    }
  }
}

module.exports = config
