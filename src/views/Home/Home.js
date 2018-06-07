import React from 'react'
// import api from 'api'

export default class Home extends React.Component {

  componentDidMount() {

    api.request('getIssues', {}).then(res => {
      console.log(res)
    })

    console.log(this)

  }

  render() {
    return (
      <div >
        111222444home
      </div>
    )
  }

} // class end