import React from 'react'
import Card from '../../../components/Card'

export default class Articles extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      articleList: ['', '', '', '', '', '', '', '']
    }
  }

  componentDidMount() {
    this.getBannerData()
  }

  render() {
    const { articleList } = this.state
    return (
      <React.Fragment>
        {articleList.map((val = {}, i) => {
          const { id, title } = val
          return (
            <Card targetName="article" hasBlock={!i} loading={!id} key={id || i} >
              <div className="title">{title}</div>

            </Card>
          )
        })}
      </React.Fragment>
    )
  }

  getBannerData() {
    $api.request('getIssues', {
      creator: $config.github,
      // labels: 'banner',
    }).then(articleList => {
      console.log(articleList)
      this.setState({ articleList })
    })
  }

} // class end