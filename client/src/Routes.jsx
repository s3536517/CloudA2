import React from 'react'
import { Route, Switch } from 'react-router-dom'
import BookData from './components/app'
import loadLink from './components/loadLink'

const Routes = props => (
  <Switch>
    <Route path="/" exact component={BookData} />
    <Route path="/shareableLink" component={loadLink} />
    <Route path="/login" exact render={() => <h1>hi</h1>} />
  </Switch>
)

Routes.propTypes = {}

export default Routes
