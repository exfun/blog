import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { prompt } from 'inquirer'
import chalk from 'chalk'


import uploadConfig from '../config/upload.config'
import packageConfig from '../package.json'
import build from './build'

const { UPLOAD_ENV } = process.env
const { config: { dist } } = packageConfig
const rootPath = process.cwd()
const inputPath = path.resolve(rootPath, dist)

console.log(rootPath, inputPath)

if (!UPLOAD_ENV) {
  const keys = Object.keys(uploadConfig)
  prompt({
    type: 'list',
    name: 'env',
    message: chalk.yellowBright(`\n\n=> 选择编译到哪个环境?`),
    choices: keys,
    default: keys[0],
  }).then(({ env }) => uploadTo(uploadConfig[env]))
} else {
  uploadTo(uploadConfig[UPLOAD_ENV])
}

function uploadTo(uploadOptions) {
  build({ hideLog: true }).then(res => {
    const { cname } = uploadOptions
    console.log(chalk.yellowBright('=> 编译完成，待上传的目录：'), chalk.underline(chalk.magentaBright(inputPath)))
    fs.writeFile(`${inputPath}/CNAME`, cname, err => {
      if (err) {
        console.log(chalk.redBright('=> 写入 CNAME 文件失败\n' + err))
      } else {
        console.log(chalk.greenBright('=> 写入 CNAME 文件成功'))
      }
    })

    execSync('git', {
      cwd: inputPath,
    })
    console.log('同步执行完成')

  }).catch((err) => {
    console.log(chalk.redBright('=> 编译失败，上传终止\n' + err))
  })
}

// function buildWebpack() {

// }



