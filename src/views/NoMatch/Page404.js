import React from 'react'

export default class Page404 extends React.Component {
  constructor() {
    super(...arguments)
    console.log(this.props)
  }


  render() {
    return (
      <div>
        <button onClick={() => $app.nav.loader(true)}> openLoader</button>
        <button onClick={() => $app.nav.loader(false)}> closeLoader</button>
      </div>
    )
  }

} // class end