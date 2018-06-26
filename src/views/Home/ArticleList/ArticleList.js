import React from 'react'
import { Link } from "@reach/router"
import Card from '../../../components/Card'
// import Image from '../../../components/Image'

import './ArticleList.scss'

export default class ArticleList extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {}
    this.allPageCount = 0 // 总页数
    this.allListCount = 0 // 列表总数
    this.pageIndex = 0 // 当前页码
  }

  componentDidMount() {
    this.getBannerData()
  }

  render() {
    const { articleList = [] } = this.state
    return (
      <React.Fragment>
        {articleList.map(this.renderListItem)}
        <div>
          1
        </div>
      </React.Fragment>
    )
  }

  renderListItem = ({ id, title, body } = {}, i) => {
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
          <h3><Link className="title" to={`/article/${id}`}>{title}</Link></h3>
        </div>
      </Card>
    )
  }

  getBannerData(page = 0, count = 10) {
    let articleList = []
    for (let i = 0; i < count; i++) {
      articleList.push('')
    }
    this.setState({ articleList })

    $api.request('getIssues', {
      creator: $config.github,
      'per_page': count,
      page,
    }).then(articleList => {
      if (!articleList || !articleList.length) return
      if (!page) {
        const { number } = articleList[0]
        this.allListCount = number
        this.allPageCount = (number - number % count) / 10 + 1
        this.pageIndex = 0
        console.log(this.allPageCount)
      }
      console.log(articleList)
      this.setState({ articleList })
    })
  }

} // class end