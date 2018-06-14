import React from 'react'
import { navigate } from "@reach/router"

import Router from './Router'
import Navbar from '../components/Navbar'

export default class App extends React.Component {

  constructor() {
    super(...arguments)

    $app.root = this
    $app.nav = navigate
  }

  render() {
    return (
      <div id="app" className="layout">
        <Navbar ref={ref => $app.nav = ref}></Navbar>
        <div className="container">
          <Router />
        </div>
      </div>
    )
  }
} // class end