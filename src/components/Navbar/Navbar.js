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
          <i className="icon icon-react flex-none logo"></i>
          <div className="">
            <p className="title">{title}</p>
            <p className="sub-title">{subTitle}</p>
          </div>
        </div>
      </header>
    )
  }

} // class end