import React from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = { comp: null }
    }

    componentDidMount() {
      // console.log('loading', $app.nav)
      $app.nav.loader(true)
      importComponent().then(({ default: comp }) => {
        this.setState({ comp }, () => {
          $app.nav.loader(false)
        })
      })
    }

    render() {
      const { comp: Comp } = this.state
      return Comp ? <Comp {...this.props} /> : null
    }
  }

  return AsyncComponent
}