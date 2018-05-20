import fs from 'fs'
import path from 'path'
import { exec, execSync } from 'child_process'
import { prompt } from 'inquirer'
import chalk from 'chalk'
import { clearDir } from './utils'

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
  }).then(({ env }) => uploadTo(uploadConfig[env], env))
} else {
  uploadTo(uploadConfig[UPLOAD_ENV])
}

async function uploadTo(uploadOptions, name) {
  const { branch } = uploadOptions

  // 上传分支确认
  if (!branch) {
    const confirm = await prompt({
      type: 'confirm',
      name: 'env',
      message: chalk.yellowBright(`\n\n=> 没有指定分支，是否继续？\n`),
      default: false,
    }).then(({ env }) => env)

    if (!confirm) return
  }

  webpackBuild(uploadOptions, name)
}

/**
 * webpack 编译
 * @param {Object} uploadOptions 
 */
function webpackBuild(uploadOptions, name) {
  const { cname } = uploadOptions
  const buildStatus = build({ hideLog: true }).then(res => {
    console.log(chalk.yellowBright('=> 编译完成，待上传的目录：'), chalk.underline(chalk.magentaBright(inputPath)))
    // 写入 CNAME
    fs.writeFile(`${inputPath}/CNAME`, cname, err => {
      if (!err) {
        console.log(chalk.greenBright('=> 写入 CNAME 文件成功'))
        gitCommit(uploadOptions, name)
      } else {
        console.log(chalk.redBright('=> 写入 CNAME 文件失败\n' + err))
      }
    })
  }).catch((err) => {
    console.log(chalk.redBright('=> 编译失败，上传终止\n' + err))
  })

}

/**
 * Git 上传
 * @param {Object} uploadOptions 
 */
function gitCommit({ branch = '', https }, name) {

  // Git 初始化
  syncExec('git init', 'Git 初始化')
  // Git 添加文件
  syncExec('git add .', 'Git 添加文件')
  // Git 添加 Commit
  syncExec(`git commit -m "commit by node [${new Date()}]"`, 'Git 添加 Commit')

  if (branch) {
    // Git 创建分支
    syncExec(`git branch ${branch}`, 'Git 创建分支')
    // Git 切换分支
    syncExec(`git checkout ${branch}`, 'Git 创建分支')
  }

  // Git 执行推送
  syncExec(`git remote add origin ${https}`, `Git 推送到 ${name} `)
  // Git 执行同步（强制）
  console.log(chalk.yellowBright(`=> 正在同步到${chalk.underline(https)}....`))
  syncExec(`git push -u origin ${branch} -f`, `Git 同步到 ${name} `)
  // 清除 .git 文件夹
  clearDir(inputPath + '/.git', true)
  console.log(chalk.greenBright('=> gitCommit 同步执行完成'))

}

/**
 * 同步执行命令
 * @param {String} bash 
 * @param {String} msg 
 */
function syncExec(bash, msg) {
  try {
    execSync(bash, {
      cwd: inputPath,
    })
    console.log(chalk.greenBright(`=> ${msg || bash}成功`))
  } catch (ex) {
    console.log(chalk.redBright(`=> ${msg || bash}失败\n`, ex))
  }
}


