import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ErrorBoundary from 'config/errorBoundary'
import UsersLayout from 'layouts/users'

const routes = (
  <ErrorBoundary>
    <Switch>
      <Route path="/" component={UsersLayout} />
    </Switch>
  </ErrorBoundary>
)

export default routes
