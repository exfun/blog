import React from 'react'

import Router from './Router'
import Navbar from '../components/Navbar'

export default class App extends React.Component {

  constructor() {
    super(...arguments)

    $app.root = this
  }

  render() {
    return (
      <div id="app">
        <Navbar ref={ref => $app.nav = ref}></Navbar>
        <p>---</p>
        <Router />
      </div>
    )
  }
} // class end