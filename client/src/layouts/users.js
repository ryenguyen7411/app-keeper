import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Topbar from 'elements/layouts/topbar.element'
import Sidebar from 'elements/layouts/sidebar.element'
import Home from 'scenes/users/index.react'

class UsersLayout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSidebarExpanded: true
    }
  }

  render() {
    return (
      <div className="app">
        <Topbar onToggleSidebar={this.toggleSidebar} />
        <Sidebar
          className={`${this.state.isSidebarExpanded ? 'expanded' : ''}`}
        />
        <div className="container main">
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </div>
    )
  }

  toggleSidebar = () => {
    console.log('TOGGLE')
    this.setState(state => ({
      ...state,
      isSidebarExpanded: !state.isSidebarExpanded
    }))
  }
}

export default UsersLayout
