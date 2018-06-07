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