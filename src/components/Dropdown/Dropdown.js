import React from 'react'
import './Dropdown.scss'

export default class Dropdown extends React.Component {
  constructor() {
    super(...arguments)
  }

  render() {
    const { title: Title, className, list, children } = this.props
    return (
      <div className={`rc-dropdown ${className}`}>
        {<Title></Title>}
        <div className="rc-dropdown-content">
          {children}
        </div>
      </div>
    )
  }

} // class end