import React from 'react'
import { asyncImport } from '../utils'

const route = {
  path: '/',
  // component: asyncImport(() => import('../views/Home')),
  // params: { name: 'home' },
  children: [
    { path: '/', component: asyncImport(() => import('../views/Home')), params: { name: 'home' } },

    { path: '/page1', component: asyncImport(() => import('../views/Home')) },
    { path: '/page2', component: asyncImport(() => import('../views/Home')) },

    // 404
    { component: asyncImport(() => import('../views/NoMatch')) },
  ]
}


export default route