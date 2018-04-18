import React from 'react'

import Note from 'elements/notes/note.element'

const HomeNote = ({ onSelect, note }) => (
  <div className="col-sm-6 col-md-4 col-lg-3">
    <Note onSelect={onSelect} note={note} />
  </div>
)

const Notes = [
  {
    id: 1,
    title: 'Good',
    contents: [
      {
        todo: 'Hello world',
        isChecked: true
      },
      {
        todo: 'Hello world 2',
        isChecked: false
      }
    ]
  },
  {
    id: 2,
    title: 'Note 2',
    contents: [
      {
        todo: 'Hello world',
        isChecked: false
      },
      {
        todo: 'Hello world 2',
        isChecked: false
      }
    ]
  },
  {
    id: 3,
    title: 'Note 3',
    contents: [
      {
        todo: 'Hello world',
        isChecked: true
      },
      {
        todo: 'Hello world 2',
        isChecked: false
      }
    ]
  }
]

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedNote: undefined
    }
  }
  render() {
    return [
      <div key="pinned">
        <h6>Được ghim</h6>
      </div>,
      <div key="unpinned">
        <h6>Khác</h6>
        <div className="row gutters-4">
          {Notes.map((note, index) => (
            <HomeNote key={index} onSelect={this.selectNote} note={note} />
          ))}
        </div>
      </div>
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

export default Home
