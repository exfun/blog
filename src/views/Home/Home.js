import React from 'react'

export default class Main extends React.Component {

  componentDidMount() {

    // api.request('getIssues', {}).then(res => {
    //   console.log(res)
    // })

  }

  render() {
    return (
      <div >
        111
        {this.props.params.name}
      </div>
    )
  }

} // class end