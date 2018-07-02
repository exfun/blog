import React from 'react'
import { Link } from "@reach/router"
import { Card, Button } from '../../../components'
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
    // this.getListData()
  }

  render() {
    const { articleList = [] } = this.state
    return (
      <div className="flex-1 article-list">
        {articleList.map(this.renderListItem)}
        <div className="flex row between pagination-controller">
          <Button>上一页</Button>
          <Button>下一页</Button>
        </div>
      </div>
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

  getListData(page = 0, count = 10) {
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