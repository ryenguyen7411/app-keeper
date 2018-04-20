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

import {
  STATUS_PUBLIC,
  STATUS_ARCHIVED,
  STATUS_DELETED
} from 'config/constants'
import Note from 'elements/notes/note.element'

const CurrentHash = {
  HOME: '',
  NOTES: '#notes',
  TAGS: '#tags',
  ARCHIVED: '#archived',
  DELETED: '#deleted',
  SEARCH: '#search',
  REMINDER: '#reminder'
}

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
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 my-1">
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
      selectedNote: undefined,
      currentHash: '',
      isInitialized: false
    }
  }
  componentDidMount() {
    this.props.noteGraph(getNotes())
    this.props.noteGraph(getNoteTags())
    this.props.noteGraph(getColors())
  }

  componentWillReceiveProps(props) {
    if (
      this.state.isInitialized &&
      props.location.hash === this.state.currentHash
    ) {
      return
    }

    if (!props.notes) return

    const sourceNotes = props.notes
    const isInitialized = this.state.isInitialized

    const currentHash = this.state.currentHash
    const hash = props.location.hash

    function getNotes() {
      if (hash === CurrentHash.HOME || hash === CurrentHash.NOTES) {
        if (
          !isInitialized ||
          (currentHash !== CurrentHash.HOME &&
            currentHash !== CurrentHash.NOTES)
        ) {
          return sourceNotes.filter(note => note.status.id === STATUS_PUBLIC)
        }
      } else if (hash === CurrentHash.TAGS) {
        //
      } else if (hash === CurrentHash.ARCHIVED) {
        return sourceNotes.filter(note => note.status.id === STATUS_ARCHIVED)
      } else if (hash === CurrentHash.DELETED) {
        return sourceNotes.filter(note => note.status.id === STATUS_DELETED)
      } else if (hash === CurrentHash.SEARCH) {
        //
      } else if (hash === CurrentHash.REMINDER) {
        //
      }
    }

    const newN = getNotes()

    this.setState(state => ({
      ...state,
      notes: newN,
      currentHash: hash,
      isInitialized: true
    }))
  }

  render() {
    const notes = this.state.notes || []
    const { noteTags = [], colors = [] } = this.props

    const pinnedNote = notes.filter(note => note.pinned === true)
    const unPinnedNote = notes.filter(note => note.pinned !== true)

    return [
      // <HomeNote
      //   key="new"
      //   onSelect={this.selectNote}
      //   onCreate={this.createNote}
      //   isEmpty={true}
      //   colors={colors}
      // />,
      !!pinnedNote.length && (
        <div key="pinned">
          <p className="mb-0 mt-2">Được ghim</p>
          <div className="row gutters-4">
            {pinnedNote.map((note, index) => {
              const tags = noteTags.filter(tag => tag.note_id === note.id)
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
        </div>
      ),
      <div key="unpinned">
        {!!pinnedNote.length && <p className="mb-0 mt-2">Khác</p>}
        <div className="row gutters-4">
          {unPinnedNote.map((note, index) => {
            const tags = noteTags.filter(tag => tag.note_id === note.id)
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
