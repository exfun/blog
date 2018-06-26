import React from 'react'
import { Link } from "@reach/router"
import Card from '../../../components/Card'
// import Image from '../../../components/Image'

import './ArticleList.scss'

export default class ArticleList extends React.Component {
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
        {articleList.map(this.renderListItem)}
      </React.Fragment>
    )
  }

  renderListItem = ({ id, title, body }, i) => {
    const bodyStr = '' + body
    let banner = bodyStr.match(/!\[banner\]\((.+)\)/)
    banner = banner && banner.length ? banner[1] : undefined
    // banner = banner && banner.length ? banner[1] : GeoPattern.generate(title).toDataUri()
    return (
      <Card
        loading={!id} key={id || i}
        targetName="article"
        className="flex row articles-list-item"
      >
        <div className="item-background" style={{ backgroundImage: `url(${banner})` }}></div>

        <div className="item-content">
          <h2><Link className="title" to={`/article/${id}`}>{title}</Link></h2>
        </div>
      </Card>
    )
  }

  getBannerData() {
    $api.request('getIssues', {
      creator: $config.github,
      'per_page': 10,
      page: 3,
    }).then(articleList => {
      console.log(articleList)
      this.setState({ articleList })
    })
  }

} // class end