const path = require('path')
const webpack = require('webpack')
const htmlPlugin = require('html-webpack-plugin')

const { NODE_ENV } = process.env

// 通用配置
const config = {
  mode: NODE_ENV,
  target: 'web',
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, '../src'),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
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
    new htmlPlugin({
      title: 'title',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      NODE_ENV: `${NODE_ENV}`
    })
  ]
}

if (NODE_ENV == 'development') {
  // 开发环境配置
  config.devtool = 'source-map'
  config.devServer = {
    port: 3000,
    host: 'localhost',
    hot: true,
    inline: true,
    clientLogLevel: 'none',
    historyApiFallback: true,
    overlay: {
      errors: true
    },
    open: false,
  }

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else if (NODE_ENV == 'production') {
  // 生产环境配置
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin() // 压缩 js
  )
}

module.exports = config