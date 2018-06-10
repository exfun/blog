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
      return <Route exact key={key} path={path} render={props => {
        // 将 router 的 history 暴露到 $app 这个操作只会发生一次
        if (!$app.history) $app.history = props.history

        return <Comp {...routeConfig} {...props} />
      }} />
    }
  }

  render() {
    return this.creatRoute(pageRoutes)
  }


}