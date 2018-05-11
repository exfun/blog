import React from 'react';
import ReactDOM from 'react-dom';

import './style.scss'

// import Bundle from './bundle.js';
// import App from 'bundle-loader?lazy!./App'


// const root = document.createElement('div')
// document.body.appendChild(root)


// //这里只是给this.props.child传一个方法，最后在Bundle的render里面调用
// const A = (props) => (
//   <Bundle load={App}>
//     {(Container) => <Container {...props} />}
//   </Bundle>
// )

// ReactDOM.render(<A />, root)

const App = import(/* webpackChunkName: "app" */ './App').then(x => x)

console.log(App)
// console.log(123)