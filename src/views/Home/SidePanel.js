import React from 'react'
import Card from '../../components/Card'
import Image from '../../components/Image'

export default class SidePanel extends React.Component {
  constructor() {
    super(...arguments)
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <Image src="https://avatars.githubusercontent.com/lanten?s=460&v=4" />
          Hello
        </Card>
        <Card loading>
          card ok
        </Card>
      </React.Fragment>
    )
  }

} // class end