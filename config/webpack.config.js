const path = require('path')
const webpack = require('webpack')

const htmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

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
    chunkFilename: 'js/[name].js',
    // publicPath: '',
    filename: 'js/[name].js',
    // crossOriginLoading: 'anonymous',
  },



  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: appPath,
        // loaders: ['bundle-loader?lazy&name=[name]', 'babel-loader']
        loaders: ['babel-loader']
        // use: NODE_ENV == 'production' ? [
        // use: [
        //   {
        //     loader: 'bundle-loader',
        //     options: {
        //       lazy: true,
        //       name: '[name]'
        //     }
        //   },
        //   { loader: 'babel-loader' },
        // ]
        // ] : { loader: 'babel-loader' }
      },
      {
        test: /\.css$/,
        include: appPath,
        use: [
          // 'style-loader',
          {
            loader: 'css-loader',
            options: {
              limit: 1024,
              name: 'styles/[name]'
            }
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