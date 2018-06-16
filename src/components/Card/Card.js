import React from 'react'

import './Card.scss'

export default class Card extends React.Component {

  static defaultProps = {
    targetName: 'div', // 元素标签名称
    loading: false, // 是否显示加载骨架
    hasBlock: false, // 是否显示图片骨架
  }

  constructor() {
    super(...arguments)
  }

  render() {
    const { loading, children, className, style, onClick, targetName: Target } = this.props
    return (
      <Target className={`rc-card ${className ? className : ''}`} style={style} onClick={onClick}>
        {loading ? this.renderSkeleton() : children}
      </Target>
    )
  }

  // 加载骨架
  renderSkeleton() {
    const { loading, hasBlock } = this.props

    return (
      <div className={`flex row skeleton${loading ? ' loading' : ''}`}>
        {hasBlock && <div className="col block"></div>}
        <div className="flex-1 flex column">
          <div className="flex row row">
            <div className="flex-4 col"></div>
            <div className="flex-4"></div>
            <div className="flex-2 col"></div>
          </div>
          <div className="flex row row">
            <div className="flex-3 col"></div>
            <div className="flex-1 col"></div>
          </div>
          <div className="flex row row">
            <div className="flex-1 col"></div>
            <div className="flex-1 col"></div>
          </div>
          <div className="flex row row">
            <div className="flex-1 col"></div>
            <div className="flex-4 col"></div>
            <div className="flex-2"></div>
          </div>
          <div className="flex row row">
            <div className="flex-1 col"></div>
            <div className="flex-2"></div>
            <div className="flex-1 col"></div>
          </div>
        </div>
      </div>
    )
  }

} // class end