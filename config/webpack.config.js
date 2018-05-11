const path = require('path')
const webpack = require('webpack')

const htmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const { config, main } = require('../package.json')


const { NODE_ENV } = process.env
const { source, dist, template } = config
const appPath = path.join(__dirname, `../${source}`)


console.log(NODE_ENV, appPath)


const webpackConfig = {
  mode: NODE_ENV,
  target: 'web',
  // publicPath: '/',
  entry: path.join(__dirname, `../${main}`),
  output: {
    path: path.join(__dirname, `../${dist}`),
    // publicPath: '',
    filename: 'js/[name]-[hash:7].js',
    chunkFilename: 'js/[id]-[chunkhash:7].js',
    // crossOriginLoading: 'anonymous',
  },



  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: appPath,
        loader: ['babel-loader']
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        include: appPath,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new htmlWebpackPlugin({
      // title: 'title',
      template: `${appPath}/${template}`,
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash:7].css',
      chunkFilename: "css/[id]-[chunkhash:7].css"
    }),
  ],
}

if (NODE_ENV == 'development') {
  // 开花环境配置
  console.log('开发环境')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  )
} else if (NODE_ENV == 'production') {
  // 生产环境配置
  console.log('生产环境')
  // webpackConfig.plugins.push(
  //   new webpack.optimize.UglifyJsPlugin() // 压缩 js
  // )
}

module.exports = webpackConfig