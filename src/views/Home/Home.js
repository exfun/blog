import React from 'react'

import './Home.scss'
import Articles from './Articles/Articles'
import SidePanel from './SidePanel/SidePanel'

export default class Home extends React.Component {
  constructor() {
    super(...arguments)
  }

  render() {
    return (
      <div className="flex row home">
        <div className="flex-1 main">
          <Articles />
        </div>
        <div className="side-panel">
          <SidePanel />
        </div>
      </div>
    )
  }

} // class end
