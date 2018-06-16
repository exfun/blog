import React from 'react'

import './Home.scss'
import Articles from './Articles'
import SidePanel from './SidePanel'

export default class Home extends React.Component {
  constructor() {
    super(...arguments)
  }

  componentDidMount() {

    this.getBannerData()

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

  getBannerData() {
    // $api.request('getIssues', {
    //   creator: $config.github,
    //   // labels: 'banner',
    // }).then(res => {
    //   console.log(res)
    // })
  }

} // class end
