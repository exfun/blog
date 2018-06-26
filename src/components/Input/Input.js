import React from 'react'
import './Input.scss'

export default class Input extends React.Component {

  static defaultProps = {
    group: {}, // 外层样式
    type: 'text',
    className: 'flex-1',
  }

  constructor() {
    super(...arguments)

    this.inputRef = React.createRef()
    this.state = {
      focus: false
    }
  }

  componentDidMount() {
    this.inputRef.current.addEventListener('focus', (e) => {
      this.setState({ focus: true })
    })
    this.inputRef.current.addEventListener('blur', (e) => {
      this.setState({ focus: false })
    })
  }

  render() {
    const { focus } = this.state
    const { input = {}, children, className, disabled = false } = this.props
    return (
      <div className={`rc-input-group flex center-v${focus ? ' focus' : ''} ${className}`}>
        <input ref={this.inputRef} {...input} className={`flex-1 ${input.className ? input.className : ''}`} disabled={disabled} />
        {children}
      </div>
    )
  }

} // class end

