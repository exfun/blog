import React from 'react'
// import api from 'api'

export default class Home extends React.Component {
  constructor() {
    super(...arguments)
  }

  componentDidMount() {

    this.getBannerData()

  }


  render() {
    return (
      <div >
        111222444home
      </div>
    )
  }

  getBannerData() {
    $api.request('getIssues', {
      creator: $config.github,
      labels: 'banner',
    }).then(res => {
      console.log(res)
    })
  }

} // class end
