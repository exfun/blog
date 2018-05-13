import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'

const root = document.createElement('div')
document.body.appendChild(root)


import('./views/App').then(({ default: App }) => {
  console.log(App, root)
  ReactDOM.render(<App />, root)
})
