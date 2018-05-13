import React from "react"
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Route, Switch, Redirect
} from "react-router-dom"

import { pageRoutes } from '../routes'


export default class AppRouter extends React.Component {
  constructor() {
    super()
  }

  creatRoute(routeConfig, i = 0) {
    const { key, path, component, children, params = {} } = routeConfig

    return <Route key={key} path={path} render={props => {
      const Comp = component
      return <Comp {...props} params={params} children={(match, a) => {
        if (children) {
          return (
            <Router>
              {children.map(this.creatRoute)}
            </Router>
          )
        }
      }} />
    }} />
  }

  render() {

    return (
      <Router>
        <Switch>
          {this.creatRoute(pageRoutes)}
          {/* <Route key={key || i} path={path} render={props => {
            const Comp = component
            return <Comp {...props} params={params} />
          }} />
          {pageRoutes.children && pageRoutes.children.map(({ key, path, component, params = {} }, i) => {
            console.log(path)
            return <Route key={key || i} path={path} render={props => {
              const Comp = component
              return <Comp {...props} params={params} />
            }} />
          })} */}
          {/* <PageRoute component={NoMatch} type="404" /> */}
        </Switch>
      </Router>
    )
  }


} // --- 

const PageRoute = ({ component: Component, ...rest }) => {
  console.log(Component)
  // 路由配置中的 params 可以配置默认参数
  return (
    <Route {...rest} render={props => {

      if (global.isLogin) {
        return (
          <App params={rest.params || {}}>{<Component {...props} params={rest.params || {}} />}</App>
        )
      } else {
        return (
          <Redirect to={{
            pathname: cfg.appname + '/login',
            state: { from: { ...props.location, ...rest.params } }
          }} />
        )
      }

    }} />
  )
}