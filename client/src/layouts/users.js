import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { noteGraph } from 'api/note.api'
import { getNotes, getTags, getNoteTags, getColors } from 'config/graphPayload'

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

  componentDidMount() {
    this.props.noteGraph(getNotes())
    this.props.noteGraph(getTags())
    this.props.noteGraph(getNoteTags())
    this.props.noteGraph(getColors())
  }

  render() {
    return (
      <div className="app">
        <Topbar onToggleSidebar={this.toggleSidebar} />
        <Sidebar
          className={`${this.state.isSidebarExpanded ? 'expanded' : ''}`}
          tags={this.props.tags}
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
    this.setState(state => ({
      ...state,
      isSidebarExpanded: !state.isSidebarExpanded
    }))
  }
}

const mapStateToProps = state => {
  return {
    tags: state.noteReducer.tags
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      noteGraph
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersLayout)
