import React from 'react'

import Router from './Router'
import Navbar from '../components/Navbar'

export default class App extends React.Component {

  constructor() {
    super()

    this.navbarRef = React.createRef()
  }

  render() {
    return (
      <div id="app">
        <Navbar ref={this.navbarRef}></Navbar>
        <p>---</p>
        <Router navbarRef={this.navbarRef} />
      </div>
    )
  }
} // class end