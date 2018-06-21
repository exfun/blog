import React from 'react'
import Image from '../Image'
import './Avatar.scss'

export default class Avatar extends React.Component {
  constructor() {
    super(...arguments)
  }

  render() {
    const { src, size } = this.props
    return (
      <div className="rc-avatar" style={{ width: size, height: size }}>
        <Image src={src} />
      </div>
    )
  }

} // class end