import React from 'react'

class Main extends React.Component {

  componentWillMount() {
    console.log(this)
  }

  render() {
    return (
      <div>
        <p>ok2222222333</p>
        <button onClick={() => console.log('ok')}>test</button>
      </div>
    )
  }

}
export default Main