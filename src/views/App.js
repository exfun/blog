import React from 'react'

import Router from './Router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default class App extends React.Component {

  constructor() {
    super(...arguments)

    $app.root = this
  }

  render() {
    return (
      <div id="app" className="layout">
        <Navbar ref={ref => $app.nav = ref}></Navbar>
        <div className="flex-1 container">
          <Router />
        </div>
        <Footer />
      </div>
    )
  }
} // class end