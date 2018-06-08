import React from 'react'
import ReactDOM from 'react-dom'

import IENot from './views/IENot'
import './styles/index.scss'

import App from './views/App'

// import VConsole from 'vconsole'

// const { NODE_ENV } = process.env

// if (NODE_ENV == 'development') {
//   global.vConsole = new VConsole() // 微信调试
// }


if (!!window.ActiveXObject || "ActiveXObject" in window) {
  IENot()
} else {
  const root = document.createElement('div')
  document.body.appendChild(root)

  ReactDOM.render(<App />, root)
}

console.info(` __         ______     __   __     ______   ______     __   __    
/\\ \\       /\\  __ \\   /\\ "-.\\ \\   /\\__  _\\ /\\  ___\\   /\\ "-.\\ \\   
\\ \\ \\____  \\ \\  __ \\  \\ \\ \\-.  \\  \\/_/\\ \\/ \\ \\  __\\   \\ \\ \\-.  \\  
 \\ \\_____\\  \\ \\_\\ \\_\\  \\ \\_\\\\"\\_\\    \\ \\_\\  \\ \\_____\\  \\ \\_\\\\"\\_\\ 
  \\/_____/   \\/_/\\/_/   \\/_/ \\/_/     \\/_/   \\/_____/   \\/_/ \\/_/ 

`)

console.warn('水浅王八多，遍地是大哥，本站文章没有特殊说明皆为原创，转载请注明出处！')