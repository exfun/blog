import React from 'react'
import api from 'api'

export default class Main extends React.Component {

  componentDidMount() {

    // api.request('getIssues', {}).then(res => {
    //   console.log(res)
    // })
    console.log('123333', api)

  }

  render() {
    return (
      <div >
        111222444
        {this.props.params.name}
      </div>
    )
  }

} // class end