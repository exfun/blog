import React from 'react'
// import api from 'api'

console.log('123333', api)

export default class Main extends React.Component {

  componentDidMount() {

    api.request('getIssues', {}).then(res => {
      console.log(res)
    })

  }

  render() {
    return (
      <div >
        111222444home
      </div>
    )
  }

} // class end