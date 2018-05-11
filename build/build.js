import path from 'path'

import webpack from 'webpack'
import chalk from 'chalk'

import webpackConfig from '../config/webpack.config'

import { clearDir } from './utils'

clearDir(path.join(__dirname, '../dist'))

webpack(webpackConfig, (err, stats) => {
  if (err) {
    throw err
  }
  console.log(chalk.yellow('start building ...'))
  process.stdout.write(
    stats.toString({
      colors: true,
      hash: false,
      version: true,
      timings: true,
      assets: true,
      chunks: false,
      children: false,
      modules: false,
    }) + '\n\n'
  )

  if (stats.hasErrors() || stats.hasWarnings()) {
    console.log(chalk.red('building failed'))
    return
  }

  console.log(chalk.greenBright('building successfully'))
  return
})