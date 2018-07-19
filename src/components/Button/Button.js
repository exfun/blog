import React from 'react'
import { Transition } from 'react-transition-group'

import './Button.scss'

export default class Button extends React.Component {

  static defaultProps = {
    target: 'a'
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.buttonRef = React.createRef()
  }

  componentDidMount() {
    this.buttonRef.current.addEventListener('click', ({ target }) => {
      target.className = 'rc-button-content'
      setTimeout(() => {
        target.className = 'rc-button-content in'
      }, 5)
      // console.log(target)
    }, false)
  }

  render() {
    const { children, target: Target, className } = this.props
    return (
      <Target {...this.props} className={`rc-button ${className ? className : ''}`}>
        <div ref={this.buttonRef} className={`rc-button-content`}>
          {children}
          {/* <Transition in={hasRipple} timeout={10} unmountOnExit>
            {state => {
              return (
                <div
                  className={`
                    rc-button-ripple 
                    ${state == 'entered' ? 'in' : ''}
                    ${rippleActive ? 'active' : ''}
                  `}
                ></div>
              )
            }}
          </Transition> */}
        </div>
      </Target>
    )
  }

} // class Button end