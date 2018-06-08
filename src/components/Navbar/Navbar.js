import React from 'react'
import './Navbar.scss'
export default class Navbar extends React.Component {

  constructor() {
    super(...arguments)
    console.log($config)
  }

  render() {
    const { title, subTitle } = $config
    return (
      <header className="flex center nav-bar">
        <div className="flex1 flex row center-v container">
          <img src={require('../../images/logo.svg')} className="flex-none logo" />
          <div className="">
            <h3 className="title text-gray">{title}</h3>
            <p className="sub-title text-light fs-12">{subTitle}</p>
          </div>
        </div>
      </header>
    )
  }

} // class end