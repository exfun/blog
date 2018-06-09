import React from 'react'

import Input from '../Input'
import './Navbar.scss'


export default class Navbar extends React.Component {

  constructor() {
    super(...arguments)
    // console.log($config)

    // console.log($app)
  }

  render() {
    const { title, subTitle } = $config
    return (
      <header className="nav-bar">
        <div className="flex1 flex row center-v container">
          <img src={require('../../images/logo.svg')} className="flex-none logo" />
          <a href={$config.index}>
            <h3 className="title text-gray">{title}</h3>
            <p className="sub-title text-light fs-12">{subTitle}</p>
          </a>
          <div className="flex1"></div>
          <ul className="flex row menus">
            <li>test1</li>
            <li>test2</li>
            <li>test3</li>
          </ul>
          <div className="flex search">
            <Input
              group={{ style: { lineHeight: '24px' }, className: 'flex1' }}
              placeholder="搜索文章..."
              onFocus={(e) => this.onSearchFocus(e, true)}
              onBlur={(e) => this.onSearchFocus(e, false)}
            />
          </div>
          <img className="loading" src={require('../../images/loaders/loader3.svg')} />
        </div>
      </header>
    )
  }

  onSearchFocus(e, isFocus) {
    console.log(isFocus)
  }

} // class end