import React from 'react'
import Card from '../../../components/Card'

export default class Articles extends React.Component {
  constructor() {
    super(...arguments)
  }

  render() {
    return (
      <React.Fragment>
        <Card targetName="article" hasBlock loading>
          card ok
        </Card>
        <Card loading>
          card ok
        </Card>
      </React.Fragment>
    )
  }

} // class end