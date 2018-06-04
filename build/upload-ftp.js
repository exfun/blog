import fs from 'fs'
import Ftp from 'ftp'
import chalk from 'chalk'
import path from 'path'

const ftpClient = new Ftp()

/**
 * 上传到 FTP
 * @param {Object} ftpConfig ftp 服务器配置
 * @param {String} inputPath 待上传的文件夹
 */
export default function uploadToFtp(ftpConfig, inputPath) {
  const { host, user, port, password, name, path } = ftpConfig
  // 创建 FTP 连接
  ftpClient.connect({ host, user, port, password })
  console.log(chalk.yellowBright(`=> 正在连接 ${name}`))

  ftpClient.on('error', err => {
    console.log(chalk.redBright(`=> 出错 ${err}`))
  })

  ftpClient.on('ready', (res) => {
    console.log(chalk.greenBright(`=> 连接 ${name} 成功`))

    addFile(...arguments)

    console.log(chalk.magenta.magenta(`=> 正在上传...`))

    ftpClient.end()
  })

}

function addFile(ftpConfig, inputPath, parent = '') {
  let files = []

  if (fs.existsSync(inputPath)) {
    files = fs.readdirSync(inputPath)

    files.forEach(file => {
      let curPath = path.resolve(inputPath, file)

      // console.log(curPath, fs.statSync(curPath).isDirectory())

      if (fs.statSync(curPath).isDirectory()) {
        addFile(ftpConfig, curPath, parent + '/' + file)
      } else {
        const { path: ftpPath } = ftpConfig
        const uploadUrl = path.join(ftpPath, parent, file)
        const uploadDir = path.join(ftpPath, parent)

        ftpClient.mkdir(uploadDir, true, err => {
          if (err) return console.log(chalk.redBright(`=> 创建文件夹失败 ${err}`))
          console.log(chalk.greenBright(`=> 创建文件夹 ${uploadDir} 成功`))

          ftpClient.put(curPath, uploadUrl, (err) => {
            if (err) return console.log(chalk.redBright(`=> 上传出错 ${err}`))
            console.log(chalk.greenBright(`=> 上传文件 ${uploadUrl} 成功`))
          })
        })

        // console.log('文件', file, '路径', curPath, 'parent', parent)
      }
    })
  } else {
    console.log(chalk.redBright(`=> 路径不存在 ${inputPath}`))
  }
}