import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Topbar from 'elements/layouts/topbar.element'
import Sidebar from 'elements/layouts/sidebar.element'
import Home from 'scenes/users/index.react'

const UsersLayout = () => (
  <div className="app">
    <Topbar />
    <Sidebar />
    <div className="container main">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  </div>
)

export default UsersLayout
