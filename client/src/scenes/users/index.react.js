import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { noteGraph, moveNote } from 'api/note.api'
import {
  getNote,
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteTags,
  getColors
} from 'config/graphPayload'

import { STATUS_PUBLIC, STATUS_DELETED } from 'config/constants'
import Note from 'elements/notes/note.element'

const HomeNote = ({
  onSelect,
  onCreate,
  onUpdate,
  onDelete,
  onCreateClone,
  onMove,
  isEmpty = false,
  note,
  tags,
  colors
}) => {
  // console.log('HOME note', onCreateClone, note)
  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <Note
        onSelect={onSelect}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onCreateClone={onCreateClone}
        onMove={onMove}
        isEmpty={isEmpty}
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
    const notes = this.props.notes.filter(
      note => note.status.id === STATUS_PUBLIC
    )

    const pinnedNote = notes.filter(note => note.pinned === true)
    const unPinnedNote = notes.filter(note => note.pinned !== true)

    const { colors } = this.props

    return [
      // <HomeNote
      //   key="new"
      //   onSelect={this.selectNote}
      //   onCreate={this.createNote}
      //   isEmpty={true}
      //   colors={colors}
      // />,
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
                onDelete={this.deleteNote}
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
                onMove={this.moveNote}
                note={note}
                tags={tags}
                colors={colors}
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

  createNote = (id, updateAttributes) => {}

  updateNote = (id, updatedAttributes) => {
    console.log('PINNED', id, updatedAttributes)

    const getNoteQuery = getNote(id)
    this.props.noteGraph(
      updateNote(id, updatedAttributes),
      this.props.noteGraph,
      getNoteQuery
    )
  }

  deleteNote = id => {
    const deleteNoteMutation = deleteNote(id)
    this.props.noteGraph(
      updateNote(id, { status_id: STATUS_DELETED }),
      this.props.noteGraph,
      deleteNoteMutation
    )
  }

  cloneNote = note => {
    this.props.noteGraph(createNote(note))
  }

  moveNote = ({ sourceId, targetId }) => {
    const ids = this.props.notes.map(note => note.id)
    const sourceIndex = ids.indexOf(sourceId)
    const targetIndex = ids.indexOf(targetId)

    this.props.moveNote({
      sourceId,
      sourceIndex,
      targetIndex
    })
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
      noteGraph,
      moveNote
    },
    dispatch
  )
}

const DnDHome = DragDropContext(HTML5Backend)(Home)
export default connect(mapStateToProps, mapDispatchToProps)(DnDHome)
