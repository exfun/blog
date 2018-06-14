import React from 'react'
import { asyncImport } from '../utils'

// const route = {
//   path: '/',
//   // component: asyncImport(() => import('../views/Home')),
//   // params: { name: 'home' },
//   children: [
//     { path: '/', component: asyncImport(() => import('../views/Home')), params: { name: 'home' } },

//     {
//       path: '/page1', component: () => <div>123</div>, children: [
//         { path: '/home', component: () => <div>123</div> },
//       ]
//     },
//     { path: '/page2', component: asyncImport(() => import('../views/Home')) },

//     // 404
//     { component: asyncImport(() => import('../views/NoMatch')) },
//   ]
// }

const route = [
  { path: '/', component: asyncImport(() => import('../views/Home')), params: { name: 'home' } },

  {
    path: '/page1', component: props => props.children, children: [
      { path: '/', component: () => <div>page1/home</div> },
      { path: '/2', component: () => <div>page1/page3</div> },
    ]
  },
  { path: '/page2', component: () => <div>page2</div> },

  // 404
  { component: asyncImport(() => import('../views/NoMatch')), default: true },
]


export default route