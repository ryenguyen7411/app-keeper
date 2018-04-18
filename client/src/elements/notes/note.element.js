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
    const { note } = this.props

    return (
      <div
        className={`card note${this.state.isSelected ? ' fullscreen' : ''}`}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={this.select}
        onBlur={this.deselect}
        tabIndex={0}>
        <div className="card-body">
          {this.state.isSelected && (
            <h6 className="card-title">{note.title}</h6>
          )}
          <p className="card-text">{note.contents[0].todo}</p>
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
    const canSelect = this.props.onSelect(this.props.note.id)
    if (!canSelect) return false

    this.setState(state => ({
      ...state,
      isSelected: true
    }))
  }

  deselect = () => {
    const canDeselect = this.props.onSelect(undefined)
    if (!canDeselect) return false

    this.setState(state => ({
      ...state,
      isSelected: false
    }))
  }
}

export default Note
