import React from 'react'
import { Transition } from 'react-transition-group'

import './Button.scss'

export default class Button extends React.Component {

  static defaultProps = {
    target: 'div'
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.buttonRef = React.createRef()
  }

  componentDidMount() {
    this.buttonRef.current.addEventListener('click', (e) => {
      this.setState({ hasRipple: true })
    })
  }

  render() {
    const { children, target: Target, className } = this.props
    const { hasRipple } = this.state
    return (
      <Target {...this.props} className={`rc-button ${className ? className : ''}`}>
        <div ref={this.buttonRef} className="rc-button-content">
          {children}
          <Transition in={hasRipple} timeout={10} unmountOnExit>
            {state => {
              return (
                <div className={`rc-button-ripple ${state == 'entered' ? 'in' : ''}`}></div>
              )
            }}
          </Transition>
        </div>
      </Target>
    )
  }

} // class Button end