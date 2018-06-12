import React from 'react'
import { Transition } from 'react-transition-group'

import Input from '../Input'
import './Navbar.scss'


export default class Navbar extends React.Component {

  constructor() {
    super(...arguments)
    // console.log($config)
    this.state = {}
  }

  componentDidMount() {

    // $app.history.push('page1')

    // this.loader(true)
    setTimeout(() => {
      this.loader(true)
    }, 1000)
    // setTimeout(() => {
    //   this.loader(false)
    // }, 8000)
  }

  render() {
    const { title, subTitle } = $config
    const { isLoading } = this.state
    return (
      <header className={`nav-bar ${isLoading ? 'progress' : ''}`}>
        <div className="flex1 flex row center-v container">
          <a className="flex row center-v flex-none" href={$config.index}>
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
          <div className="flex row search">
            <Input
              group={{ className: `search search-content ${isLoading ? 'min' : ''}` }}
              placeholder="搜索文章..."
              onFocus={(e) => this.onSearchFocus(e, true)}
              onBlur={(e) => this.onSearchFocus(e, false)}
            />

            <Transition in={isLoading} timeout={10} unmountOnExit>
              {state => {
                return <div>
                  <img className={`loader ${state == 'entered' && 'loading'}`} src={require('../../images/loaders/loader7.svg')} />
                </div>
              }}
            </Transition>
          </div>
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

  loader(isLoading) {
    const loaderTM = Date.now()
    const time = loaderTM - (this.loaderTM || 0)
    if (time <= 400) {
      setTimeout(() => {
        this.setState({ isLoading })
      }, 400)
    } else {
      this.setState({ isLoading })
    }
    if (isLoading) this.loaderTM = loaderTM // 记录开始时间

  }

  onSearchFocus(e, isFocus) {
    console.log(isFocus)
  }

} // class end