import React from 'react'
// import api from 'api'

export default class Home extends React.Component {
  constructor() {
    super(...arguments)
  }

  componentDidMount() {

    console.log('创建')
    $api.request('getIssues', {}).then(res => {
      console.log(res)
    })

    // console.log(this)

  }


  render() {
    return (
      <div >
        111222444home
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
        <div>br</div>
      </div>
    )
  }

} // class end
