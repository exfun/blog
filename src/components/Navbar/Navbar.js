import React from 'react'

import Input from '../Input'
import './Navbar.scss'


export default class Navbar extends React.Component {

  constructor() {
    super(...arguments)
    // console.log($config)

  }

  componentDidMount() {

    // $app.history.push('page1')

    this.loader(true)
    setTimeout(() => {
      this.loader(true)
    }, 3000)
  }

  render() {
    const { title, subTitle } = $config
    return (
      <header className="nav-bar">
        <div className="flex1 flex row center-v container">
          <a className="flex row flex-none" href={$config.index}>
            <img src={require('../../images/logo.svg')} className="flex-none logo" />
            <div>
              <h3 className="title text-gray">{title}</h3>
              <p className="sub-title text-light fs-12">{subTitle}</p>
            </div>
          </a>
          <div className="flex1"></div>
          <ul className="flex row menus">
            {$config.menus.map(this.creatMenus)}
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

  creatMenus({ title, href, route }, i) {
    let menuProps = {}
    if (route) {
      menuProps = {
        onClick() {
          $app.history.push(route)
        },
        href: 'javascript:;'
      }
    } else {
      menuProps = {
        href,
      }
    }
    return <a className="menu-item" key={i} {...menuProps}>{title}</a>
  }

  loader(visible) {

  }

  onSearchFocus(e, isFocus) {
    console.log(isFocus)
  }

} // class end