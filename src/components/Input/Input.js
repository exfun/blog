import React from 'react'
import './Input.scss'

export default class Input extends React.Component {

  static defaultProps = {
    group: {}, // 外层样式
    type: 'text',
    className: 'flex1',
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
    const { group = {} } = this.props
    return (
      <div {...this.props.group} className={`rc-input-group flex  ${focus ? 'focus' : ''} ${group.className}`}>
        <input ref={this.inputRef}  {...this.props} />
      </div>
    )
  }

} // class end

