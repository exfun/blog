import React from 'react';
import ReactDOM from 'react-dom';

import './style.scss'

// import Bundle from './bundle.js
import App from './App'


const root = document.createElement('div')
document.body.appendChild(root)


// //这里只是给this.props.child传一个方法，最后在Bundle的render里面调用
// const A = (props) => (
//   <Bundle load={App}>
//     {(Container) => <Container {...props} />}
//   </Bundle>
// )

ReactDOM.render(<App />, root)

// const App = import('./App').then(App => {
//   console.log(App)
//   // ReactDOM.render(<App />, root)
// })

// console.log(App)
// console.log(123)