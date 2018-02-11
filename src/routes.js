import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Home from './pages/Home'
import GraphVis from './pages/GraphVis'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Route path="graphvis" component={GraphVis} />
  </Route>
)

export default routes
