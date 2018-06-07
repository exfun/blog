import React from 'react'

import Router from './Router'

export default class Main extends React.Component {

  constructor() {
    super()
    // console.log(this)
  }

  render() {
    return (
      <div id="app">
        <p>---</p>
        <Router />
      </div>
    )
  }
} // class end