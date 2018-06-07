import React from 'react'

export default class Navbar extends React.Component {

  constructor() {
    super(...arguments)

    console.log(this.props)

  }

  componentWillMount() {
    const { appRef } = this.props
    this.$app = appRef

  }

  render() {
    return (
      <div>
        nav-bar
      </div>
    )
  }

} // class end