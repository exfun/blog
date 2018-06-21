import React from 'react'
import Card from '../../../components/Card'
import Avatar from '../../../components/Avatar'

export default class SidePanel extends React.Component {
  constructor() {
    super(...arguments)
  }

  render() {
    return (
      <div className="side-panel">
        <Card className="flex column center ">
          <Avatar src="https://avatars.githubusercontent.com/lanten?s=460&v=4" size={84} />
          <h2>Hello!</h2>
        </Card>
        <Card loading>
          card ok
        </Card>
      </div>
    )
  }

} // class end