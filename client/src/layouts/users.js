import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import 'bootstrap'
import Icon from 'react-icons-kit'
import { tag as faTag } from 'react-icons-kit/fa'
import { ic_delete, ic_mode_edit } from 'react-icons-kit/md'

import { noteGraph } from 'api/note.api'
import {
  getNotes,
  getTags,
  deleteTag,
  getNoteTags,
  getColors
} from 'config/graphPayload'

import Topbar from 'elements/layouts/topbar.element'
import Sidebar from 'elements/layouts/sidebar.element'
import Home from 'scenes/users/index.react'

class UsersLayout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSidebarExpanded: true,
      isHoverTags: {},
      isEditTags: {}
    }
  }

  componentDidMount() {
    this.props.noteGraph(getNotes())
    this.props.noteGraph(getTags())
    this.props.noteGraph(getNoteTags())
    this.props.noteGraph(getColors())
  }

  render() {
    const { tags = [] } = this.props

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

        <div
          className="modal fade modal-tags"
          id="tag-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title" id="exampleModalLabel">
                  Chỉnh sửa nhãn
                </h6>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  {tags.map(tag => (
                    <div key={`tag-${tag.id}`} id={tag.id} className="tag-item">
                      <Icon
                        size={24}
                        icon={
                          this.state.isHoverTags[tag.id] ? ic_delete : faTag
                        }
                        className="icon-delete"
                        onMouseEnter={this.onHoverTag}
                        onMouseLeave={this.onHoverTag}
                        onClick={this.onDeleteTag}
                      />
                      <input
                        type="text"
                        value={tag.title}
                        className="tag-item-input"
                        onChange={this.onHandleInputTag}
                      />
                      <Icon
                        size={24}
                        icon={ic_mode_edit}
                        className="icon-edit"
                        onClick={this.onEditTag}
                      />
                    </div>
                  ))}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal">
                  Xong
                </button>
              </div>
            </div>
          </div>
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

  onHoverTag = e => {
    e.stopPropagation()

    const tag = e.target.closest('.tag-item')

    if (!tag) return

    const isHoverTags = this.state.isHoverTags
    if (!isHoverTags[tag.id]) isHoverTags[tag.id] = true
    else isHoverTags[tag.id] = !isHoverTags[tag.id]

    this.setState(state => ({
      ...state,
      isHoverTags
    }))
  }

  onEditTag = e => {
    e.stopPropagation()

    const tag = e.target.closest('.tag-item')

    if (!tag) return

    const isEditTags = this.state.isEditTags
    if (!isEditTags[tag.id]) isEditTags[tag.id] = true
    else isEditTags[tag.id] = !isEditTags[tag.id]

    this.setState(state => ({
      ...state,
      isEditTags
    }))
  }

  onDeleteTag = e => {
    const tag = e.target.closest('.tag-item')

    if (!tag) return
    this.props.noteGraph(deleteTag(tag.id))
  }

  onHandleInputTag = e => {}
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
