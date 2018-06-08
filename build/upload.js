import fs from 'fs'
import path from 'path'

import chalk from 'chalk'
import { exec, execSync } from 'child_process'
import { prompt } from 'inquirer'
import { clearDir } from './utils'

import { dist } from '../config/dev.config'
import uploadConfig from '../config/upload.config'
import build from './build'
import uploadToFtp from './upload-ftp'

const { UPLOAD_ENV } = process.env

const rootPath = process.cwd()
const inputPath = path.resolve(rootPath, dist)

if (!UPLOAD_ENV) {
  const keys = Object.keys(uploadConfig)
  prompt({
    type: 'list',
    name: 'env',
    message: chalk.yellowBright(`\n=> 选择编译到哪个环境?`),
    choices: ['FTP', ...keys],
    default: keys[0],
  }).then(({ env }) => {
    if (env == 'FTP') {
      selectFtp()
    } else {
      uploadToPages(uploadConfig[env], env)
    }
  })
} else {
  uploadToPages(uploadConfig[UPLOAD_ENV],UPLOAD_ENV)
}

/**
 * 上传到 pages
 * @param {Object} uploadOptions 
 * @param {String} name 
 */
async function uploadToPages(uploadOptions, name) {
  if (!uploadOptions) return console.log(chalk.redBright(`没有找到 ${name} 相关的配置,请检查 build/config.upload.js`))
  const { branch } = uploadOptions

  // 上传分支确认
  if (!branch) {
    const confirm = await prompt({
      type: 'confirm',
      name: 'env',
      message: chalk.yellowBright(`\n=> 没有指定分支，是否继续？\n`),
      default: false,
    }).then(({ env }) => env)

    if (!confirm) return
  }

  webpackBuild({ type: 'pages' }).then(res => {
    // 写入 CNAME
    const { cname } = uploadOptions
    if (cname) {
      fs.writeFile(`${inputPath}/CNAME`, cname, err => {
        if (!err) {
          console.log(chalk.greenBright('=> 写入 CNAME 文件成功'))
          gitCommit(uploadOptions, name)
        } else {
          console.log(chalk.redBright('=> 写入 CNAME 文件失败\n' + err))
        }
      })
    } else {
      gitCommit(uploadOptions, name)
    }
  })
}

/**
 * 选择要上传的 FTP 
 */
function selectFtp() {
  const { ftpDefault, ftpList = [] } = getFtpConfig()
  const choicesKeys = ftpList.map(res => res.name || res.host)

  prompt({
    type: 'list',
    name: 'env',
    message: chalk.yellowBright(`\n=> 选择一个 FTP 服务器`),
    choices: ['- 添加/修改', '- 删除', ...choicesKeys],
    default: ftpDefault || choicesKeys[0],
  }).then(({ env }) => {
    switch (env) {
      case '- 添加/修改':
        addFtpList()
        break;

      case '- 删除':
        removeFtpList()
        break;

      default:
        const ftpIndex = choicesKeys.indexOf(env)
        if (ftpIndex >= 0 && ftpList[ftpIndex]) {
          webpackBuild().then(() => {
            uploadToFtp(ftpList[ftpIndex], inputPath)
          })
        } else {
          console.log(chalk.redBright('=> 好像有点不对劲'))
        }
        break;
    }
  })
}

/**
 * 添加 FTP 服务器
 */
async function addFtpList() {
  let host, port, user, password, name, path
  await prompt({
    type: 'input',
    name: 'str',
    message: chalk.yellowBright(`\n=> 请输入.FTP.地址`),
  }).then(res => host = res.str)

  await prompt({
    type: 'input',
    name: 'str',
    default: 21,
    message: chalk.yellowBright(`\n=> 请输入.FTP.端口号`),
  }).then(res => port = res.str)

  await prompt({
    type: 'input',
    name: 'str',
    message: chalk.yellowBright(`\n=> 请输入.FTP.用户名`),
  }).then(res => user = res.str)

  await prompt({
    type: 'password',
    name: 'str',
    message: chalk.yellowBright(`\n=> 请输入.FTP.密码`),
  }).then(res => password = res.str)

  await prompt({
    type: 'input',
    name: 'str',
    message: chalk.yellowBright(`\n=> 请输入.FTP.项目路径`),
  }).then(res => path = res.str)

  await prompt({
    type: 'input',
    name: 'str',
    default: host,
    message: chalk.yellowBright(`\n=> 请输入.FTP.名称`),
  }).then(res => name = res.str)

  if (!host || !user || !password || !name || !path) return console.log(chalk.redBright('=> 填写错误!'))

  const newFtp = { host, port, user, password, name, path }
  const ftpConfig = getFtpConfig()
  const { ftpList = [] } = ftpConfig
  const ftpNameIndex = ftpList.findIndex(res => res.name == name)

  if (ftpNameIndex >= 0) {
    await prompt({
      type: 'confirm',
      name: 'env',
      default: true,
      message: chalk.yellowBright(`\n=> 已存在相同名称的配置,原配置将被修改,是否继续?`),
    }).then(({ env }) => {
      if (env) ftpList[ftpNameIndex] = newFtp
    })
  } else {
    ftpList.push(newFtp)
  }

  fs.writeFile(`${rootPath}/config/ftp.config.json`, JSON.stringify(ftpConfig), err => {
    if (!err) {
      console.log(chalk.greenBright('=> 保存配置成功'))
    } else {
      console.log(chalk.redBright('=> 保存配置失败\n' + err))
    }
  })
}

/**
 * 删除 FTP 服务器
 */
async function removeFtpList() {
  const ftpConfig = getFtpConfig()
  const { ftpList = [] } = ftpConfig

  const choices = ftpList.map(res => res.name || res.host)
  prompt({
    type: 'list',
    name: 'env',
    message: chalk.yellowBright(`\n=> 要删除哪个?`),
    choices,
  }).then(({ env }) => {
    const ftpIndex = ftpList.findIndex(({ name, host }) => {
      return (env == name || env == host)
    })

    if (ftpIndex >= 0) {
      prompt({
        type: 'confirm',
        name: 'env',
        default: true,
        message: chalk.yellowBright(`\n=> 即将删除${ftpList[ftpIndex].name || ftpList[ftpIndex].host},是否继续?`),
      }).then(({ env }) => {
        if (!env) return console.log(chalk.yellowBright('=> 取消删除'))
        ftpList.splice(ftpIndex, 1)
        fs.writeFile(`${rootPath}/config/ftp.config.json`, JSON.stringify(ftpConfig), err => {
          if (!err) {
            console.log(chalk.greenBright('=> 删除成功'))
          } else {
            console.log(chalk.redBright('=> 删除失败\n' + err))
          }
        })
      })
    } else {
      console.log(chalk.redBright('=> 好像有点不对劲'))
    }
  })
}

/**
 * 获取 FTP 配置信息
 */
function getFtpConfig() {
  let ftpConfig = []
  try {
    ftpConfig = require(`${rootPath}/config/ftp.config.json`)
  } catch (error) {
    console.log(chalk.yellowBright('=> 没有找到 ftp.config.json 配置文件'))
    fs.writeFile(`${rootPath}/config/ftp.config.json`, '{"ftpList":[]}', err => {
      if (!err) {
        console.log(chalk.greenBright('=> 创建 ftp.config.json 配置文件成功'))
      } else {
        console.log(chalk.redBright('=> 创建 ftp.config.json 配置文件失败\n' + err))
      }
    })
  }
  return ftpConfig
}

/**
 * webpack 编译
 * @param {Object} uploadOptions 
 */
function webpackBuild(options) {
  return build({ hideLog: true, ...options }).then(res => {
    console.log(chalk.yellowBright('=> 编译完成，待上传的目录：'), chalk.underline(chalk.magentaBright(inputPath)))
  }).catch((err) => {
    console.log(chalk.redBright('=> 编译失败，上传终止\n' + err))
  })
}

/**
 * Git 上传
 * @param {Object} uploadOptions 
 */
function gitCommit({ branch = 'master', https }, name) {
  const hash = Date.now()
  // Git 初始化
  syncExec('git init', 'Git 初始化')
  // Git 添加文件
  syncExec('git add .', 'Git 添加文件')
  // Git 添加 Commit
  syncExec(`git commit -m "commit by node [${hash}]"`, 'Git 添加 Commit')

  if (branch != 'master') {
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
  console.log(chalk.greenBright(`=> gitCommit 同步执行完成 [${hash}]`))

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


