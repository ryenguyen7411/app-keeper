import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { noteGraph } from 'api/note.api'
import {
  getNote,
  getNotes,
  createNote,
  updateNote,
  getNoteTags,
  getColors
} from 'config/graphPayload'

import Note from 'elements/notes/note.element'

const HomeNote = ({
  onSelect,
  onUpdate,
  onCreateClone,
  note,
  tags,
  colors
}) => {
  // console.log('HOME note', onCreateClone, note)
  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <Note
        onSelect={onSelect}
        onUpdate={onUpdate}
        onCreateClone={onCreateClone}
        note={note}
        tags={tags}
        colors={colors}
      />
    </div>
  )
}
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
    this.props.noteGraph(getColors())
  }
  render() {
    const pinnedNote = this.props.notes.filter(note => note.pinned === true)
    const unPinnedNote = this.props.notes.filter(note => note.pinned !== true)

    const { colors } = this.props

    return [
      <div key="pinned">
        <h6>Được ghim</h6>
        <div className="row gutters-4">
          {pinnedNote.map((note, index) => {
            const tags = this.props.noteTags.filter(
              tag => tag.note_id === note.id
            )
            return (
              <HomeNote
                key={index}
                onSelect={this.selectNote}
                onUpdate={this.updateNote}
                note={note}
                tags={tags}
                colors={colors}
              />
            )
          })}
        </div>
      </div>,
      <div key="unpinned">
        <h6>Khác</h6>
        <div className="row gutters-4">
          {unPinnedNote.map((note, index) => {
            const tags = this.props.noteTags.filter(
              tag => tag.note_id === note.id
            )
            return (
              <HomeNote
                key={index}
                onSelect={this.selectNote}
                onUpdate={this.updateNote}
                onCreateClone={this.cloneNote}
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

  updateNote = (id, updatedAttributes) => {
    const getNoteQuery = getNote(id)
    this.props.noteGraph(
      updateNote(id, updatedAttributes),
      this.props.noteGraph,
      getNoteQuery
    )
  }

  cloneNote = note => {
    this.props.noteGraph(createNote(note))
  }
}

const mapStateToProps = state => {
  return {
    notes: state.noteReducer.notes,
    noteTags: state.noteReducer.noteTags,
    colors: state.noteReducer.colors
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
