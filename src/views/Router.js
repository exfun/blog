import React from "react"
import { Router } from "@reach/router";

import { pageRoutes } from '../routes'


export default class AppRouter extends React.Component {
  constructor() {
    super(...arguments)
  }

  render() {
    return (
      <Router>
        {pageRoutes.map(this.creatRoute)}
      </Router>
    )
  }

  creatRoute = (routeConfig, i) => {
    const { key = i, path, component: Comp, children, params, default: d } = routeConfig

    return (
      <Comp key={key} path={path} default={d} params={params}>
        {children && children.map(this.creatRoute)}
      </Comp>
    )
  }

}