import React from 'react'

class Main extends React.Component {

  componentWillMount(){
    console.log(123)
  }

  render() {
    return (
      <div >
        ok
        <button onClick={()=>console.log('ok')}>test</button>
      </div>
    )
  }

}
export default Main