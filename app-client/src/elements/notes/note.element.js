import React from 'react'

class Note extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isHovered: false,
      isSelected: false
    }
  }
  render() {
    return (
      <div
        className={`card note${this.state.isSelected ? ' fullscreen' : ''}`}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={this.select}
        onBlur={this.deselect}
        tabIndex={0}>
        <div className="card-body">
          {this.state.isSelected && <h6 className="card-title">Title</h6>}
          <p className="card-text">Content</p>
        </div>
      </div>
    )
  }

  toggleHover = () => {
    this.setState(state => ({
      ...state,
      isHovered: !state.isHovered
    }))
  }

  select = () => {
    this.setState(state => ({
      ...state,
      isSelected: true
    }))
  }

  deselect = () => {
    this.setState(state => ({
      ...state,
      isSelected: false
    }))
  }
}

export default Note
