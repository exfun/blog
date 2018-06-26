import React from 'react'
import './Image.scss'

export default class ImageClass extends React.Component {
  constructor() {
    super(...arguments)
    const { className } = this.props
    this.state = {
      image: (
        <div className={`flex center rc-loading-image ${className}`}>
          <img className="loader" src={require('../../images/loaders/loader3.svg')} />
        </div>
      )
    }
  }

  componentDidMount() {
    this.loadImageAsync().then(image => {
      this.setState({ image })
    })
  }

  render() {
    return this.state.image
  }

  loadImageAsync() {
    return new Promise((resolve, reject) => {
      const { src, className } = this.props

      const image = new Image()
      image.src = src

      image.onload = () => {
        resolve(<img {...this.props} className={`rc-image ${className ? className : ''}`} />)
      }

      image.onerror = () => {
        reject(new Error('Could not load image at' + src))
      }
    })
  }

} // class end