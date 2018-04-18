import React from 'react'

import Note from 'elements/notes/note.element'

class Home extends React.Component {
  render() {
    return [
      <div key="pinned">
        <h6>Được ghim</h6>
      </div>,
      <div key="unpinned">
        <h6>Khác</h6>
        <div className="row gutters-4">
          <div className="col-sm-6 col-md-4 col-lg-3">
            <Note />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <Note />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <Note />
          </div>
        </div>
      </div>
    ]
  }
}

export default Home
