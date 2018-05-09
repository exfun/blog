import path from 'path';
import webpack from 'webpack'

import htmlWebpackPlugin from 'html-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

import { config, main } from '../package.json'

const { NODE_ENV } = process.env
const { source, dist, template } = config
const appPath = path.join(__dirname, `../${source}`)
console.log(NODE_ENV, appPath)
// 通用配置
const webpackConfig = {
  mode: NODE_ENV,
  // target: 'web',
  // publicPath: '/',
  entry: path.join(__dirname, `../${source}/${main}`),
  output: {
    path: path.join(__dirname, `../${dist}`),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: appPath,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: appPath,
        use: [
          'style-loader',
          'css-loader',
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
              name: '[name].[ext]'
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
      template: path.join(__dirname, `../${source}/${template}`),
      filename: template,
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
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin() // 压缩 js
  )
}

export default webpackConfig