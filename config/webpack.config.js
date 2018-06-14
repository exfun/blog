const path = require('path')
const webpack = require('webpack')

const htmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const { source, dist, template, publicPath } = require('./dev.config')
const appConfig = require('./app.config')

const { NODE_ENV } = process.env

const appPath = path.join(__dirname, `../${source}`)

console.log(NODE_ENV, appPath)

const webpackConfig = {
  mode: NODE_ENV,
  target: 'web',
  entry: {
    app: `${appPath}/index.js`
  },
  resolve: {
    modules: [process.cwd(), "node_modules"]
  },
  output: {
    publicPath,
    path: path.join(__dirname, `../${dist}`),
    filename: 'js/[name]-[hash:7].js',
    chunkFilename: 'js/[id]-[chunkhash:7].js',
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
          'css-hot-loader',
          // dev:样式放标签 ， build：样式抽文件
          NODE_ENV == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|swf|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          // limit: 10000,
          name: 'assets/[name].[hash:7].[ext]',
        }
      }
      // {
      //   test: /\.(png|jpg|jpeg|gif)$/,
      //   include: appPath,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 1024,
      //         name: 'images/[name].[ext]'
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.(svg|woff|woff2|mp3|mp4)$/,
      //   include: appPath,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[path][name].[ext]',
      //         publicPath: 'assets/'
      //       }
      //     }
      //   ]
      // }
    ]
  },

  plugins: [
    new ProgressBarPlugin(),
    new htmlWebpackPlugin({
      favicon: `${appPath}/images/favicon.ico`,
      template: `${appPath}/${template}`,
      templateParameters: appConfig,
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash:7].css',
      chunkFilename: "css/[id]-[chunkhash:7].css"
    }),
    new webpack.ProvidePlugin({
      $api: 'src/api',
      $app: 'src/utils/app.js',
      $config: 'config/app.config.js',
    })
  ],

  optimization: {},
}

if (NODE_ENV == 'development') {
  // 开花环境配置
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  )
} else if (NODE_ENV == 'production') {
  // 生产环境配置
  webpackConfig.plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          pure_funcs: ['console.log'], // 删除console.log, 保留 info ，warn，error 等
        },
      }
    })
  )
}

module.exports = webpackConfig