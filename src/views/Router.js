import React from "react"
import {
  BrowserRouter as Router,
  // HashRouter as Router,
  Route, Switch, Redirect
} from "react-router-dom"

import { pageRoutes } from '../routes'


export default class AppRouter extends React.Component {
  constructor() {
    super(...arguments)
  }

  creatRoute = (routeConfig, i = 0) => {
    const { key = i, path, component: Comp, children, params = {} } = routeConfig

    if (children) {
      return (
        <Router key={key} exact>
          {/* <React.Fragment> */}
          <Switch>
            {children.map(this.creatRoute)}
          </Switch>
          {/* </React.Fragment> */}
        </Router>
      )
    } else {
      return <Route exact key={key} path={path} render={props => <Comp {...routeConfig} {...props} />} />
    }
  }

  render() {
    return this.creatRoute(pageRoutes)
  }


}