import path from 'path'
import express from 'express'
import chalk from 'chalk'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import proxy from 'http-proxy-middleware'

import webpackConfig from '../config/webpack.config'
import { config } from '../package.json'
import { bigFont } from './utils'

webpackConfig.devtool = 'source-map'

// 热加载
const hotclient = [
  'webpack-hot-middleware/client?noInfo=true&reload=true',
  // "css-hot-loader?fileMap='../css/{fileName}"
]
if (typeof webpackConfig.entry == 'object') {
  Object.keys(webpackConfig.entry).forEach((name) => {
    const value = webpackConfig.entry[name]
    if (Array.isArray(value)) {
      value.unshift(...hotclient)
    } else {
      webpackConfig.entry[name] = [...hotclient, value]
    }
  })
} else {
  webpackConfig.entry = [...hotclient, webpackConfig.entry]
}

const webpackCompiler = webpack(webpackConfig)

const devMiddleware = webpackDevMiddleware(webpackCompiler, {
  // serverSideRender: true,
  publicPath: webpackCompiler.options.output.publicPath,
  filename: path.resolve(__dirname, '../middleware'),
  noInfo: true,
  quiet: false,
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false, // 时间信息
    assets: true, // 资源信息
    builtAt: true, // 构建日期和构建时间信息
    chunks: false,
    children: false,
    modules: false,
  }
})

const hotMiddleware = webpackHotMiddleware(webpackCompiler, {
  log: false
})

const app = express()

app.use(devMiddleware)
app.use(hotMiddleware)

app.get('*', ({ url }, res) => {
  // const htmlFile = devMiddleware.fileSystem.readFileSync('./index.html', 'utf-8')
  const htmlFile = devMiddleware.fileSystem.readFileSync(path.join(webpackConfig.output.path, 'index.html'))

  console.log('=> 重定向', url)
  res.writeHeader(200, { 'Content-Type': 'text/html' });
  res.end(htmlFile);
})

if (config.proxy) {
  app.use('/', proxy({ target: config.proxy, changeOrigin: false }))
}

app.listen(config.port, function () {
  // process.stdout.clearLine()
  // process.stdout.cursorTo(0)
  console.log(chalk.yellowBright(bigFont.DEV))
  console.log(`=> dev-server at ${chalk.magenta.underline(`http://localhost:${this.address().port}`)}`)
})