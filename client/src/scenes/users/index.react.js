import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { noteGraph } from 'api/note.api'
import { getNotes, getNoteTags } from 'config/graphPayload'

import Note from 'elements/notes/note.element'

const HomeNote = ({ onSelect, note, tags }) => (
  <div className="col-sm-6 col-md-4 col-lg-3">
    <Note onSelect={onSelect} note={note} tags={tags} />
  </div>
)

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedNote: undefined
    }
  }
  componentDidMount() {
    this.props.noteGraph(getNotes())
    this.props.noteGraph(getNoteTags())
  }
  render() {
    return [
      <div key="pinned">
        <h6>Được ghim</h6>
      </div>,
      <div key="unpinned">
        <h6>Khác</h6>
        <div className="row gutters-4">
          {this.props.notes.map((note, index) => {
            const tags = this.props.noteTags.filter(
              tag => tag.note_id === note.id
            )
            return (
              <HomeNote
                key={index}
                onSelect={this.selectNote}
                note={note}
                tags={tags}
              />
            )
          })}
        </div>
      </div>,
      this.state.selectedNote && <div key="overlay" className="overlay" />
    ]
  }

  selectNote = id => {
    if (this.state.selectedNote !== undefined && id !== undefined) {
      return false
    }

    this.setState(state => ({
      ...state,
      selectedNote: id
    }))

    return true
  }
}

const mapStateToProps = state => {
  return {
    notes: state.noteReducer.notes,
    noteTags: state.noteReducer.noteTags
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
