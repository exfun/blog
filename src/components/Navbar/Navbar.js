import React from 'react'
import { Transition } from 'react-transition-group'
import { Link, navigate } from "@reach/router"

import Input from '../Input'
import Dropdown from '../Dropdown'
import './Navbar.scss'


export default class Navbar extends React.Component {

  constructor() {
    super(...arguments)

    this.state = {}
    this.loaderNum = 0
    this.navigate = navigate
  }

  componentDidMount() {

  }

  render() {
    const { title, subTitle } = $config
    const { isLoading } = this.state
    return (
      <header className={`nav-bar${isLoading ? ' ls-loading' : ''}`}>
        <div className="flex-1 flex row center-v container">
          <a className="flex row center-v flex-none" href={$config.index}>
            <img src={require('../../images/logo.svg')} className="flex-none logo" />
            <div>
              <h3 className="title text-gray">{title}</h3>
              <p className="sub-title text-light fs-12">{subTitle}</p>
            </div>
          </a>
          <div className="flex-1"></div>
          <ul className="flex row menus">
            {$config.menus.map(this.creatMenus)}
          </ul>
          <div className="flex row search">
            <Input
              className="search-content"
              input={{ placeholder: '搜索文章...' }}
            >
              <i className="icon icon-search text-light"></i>
            </Input>

            <Transition in={isLoading} timeout={10} unmountOnExit>
              {state => {
                return <div>
                  <img className={`loader ${state == 'entered' && 'loading'}`} src={require('../../images/loaders/loader3.svg')} />
                </div>
              }}
            </Transition>
          </div>
        </div>
      </header >
    )
  }

  creatMenus = ({ title, href, route, children, key }, i) => {
    let MenuItem

    if (route) {
      MenuItem = (props) => <Link {...props} to={route}>{props.children}</Link>
    } else {
      MenuItem = (props) => <a {...props} href={href}>{props.children}</a>
    }

    if (children && children.length) {
      return (
        <Dropdown className="menu-item" key={key || i} title={() => <MenuItem>{title} <i className="icon icon-down2 fs-14"></i></MenuItem>}>
          <ul className="submenu">
            {children.map(this.creatMenus)}
          </ul>
        </Dropdown>
      )
    } else {
      return <li key={key || i} className="menu-item"><MenuItem>{title}</MenuItem></li>
    }
  }

  /**
   * 导航栏 loader
   * 调用方法 $app.nav.loader([bool])
   * @param {Boolean} isLoading  开关状态
   * @param {Boolean} enforce 是否强制关闭
   */
  loader(isLoading, enforce = false) {
    const loaderTM = Date.now()
    const time = loaderTM - (this.loaderTM || 0)

    if (isLoading) {
      if (this.loaderNum <= 0) this.setState({ isLoading })
      this.loaderTM = loaderTM // 记录开始时间
      this.loaderNum++ // 记录 loader 数量
    } else {
      this.loaderNum--
      if (enforce || this.loaderNum <= 0) {
        if (time <= 400) {
          setTimeout(() => {
            this.setState({ isLoading })
          }, 400)
        } else {
          this.setState({ isLoading })
        }
      } else {
        console.warn(`等待其它加载线程(${this.loaderNum})...`)
      }
    }
  }

  onSearchFocus(e, isFocus) {
    console.log(isFocus)
  }

} // class end