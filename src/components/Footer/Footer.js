import React from 'react'
import './Footer.scss'

export default class Footer extends React.Component {
  constructor() {
    super(...arguments)
  }

  render() {
    return (
      <div className="app-footer">
        <div className="flex column center container">
          <p className="flex row center">
            <span>©</span>&nbsp;
            <span>{new Date().getFullYear()}</span>&nbsp;
            {/* <img className="icon-heart" src={require('../../images/heart.svg')} />&nbsp; */}
            <i className="icon icon-react text-light fs-14"></i>&nbsp;
            <a href={`https://www.github.com/${$config.github}`} target="_blank">{$config.github}</a>&nbsp;
            {/* <span><i className="icon icon-react text-light fs-14"></i> React</span> */}
          </p>
        </div>
      </div >
    )
  }

} // class end