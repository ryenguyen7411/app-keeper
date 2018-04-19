import React from 'react'
import 'bootstrap'

import Icon from 'react-icons-kit'
import {
  ic_done,
  ic_color_lens,
  ic_image,
  ic_archive,
  ic_more_vert
} from 'react-icons-kit/md'
import { pin } from 'react-icons-kit/iconic'
import { handPointerO } from 'react-icons-kit/fa'

function Todo({ todoList, noteId, mode }) {
  return todoList
    .slice(0, 8)
    .map((todo, index) => (
      <TodoItem
        key={`todo-${noteId}-${index}`}
        className="card-text"
        todo={todo}
        mode={mode}
      />
    ))
}

function TodoItem({ className, todo, mode }) {
  return (
    <form>
      <p className={className}>
        {mode === 'check' && <input type="checkbox" checked={todo.isChecked} />}
        {todo.todo}
      </p>
    </form>
  )
}

class Note extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isHovered: false,
      isSelected: false
    }
  }
  render() {
    const { note, tags } = this.props

    return (
      <div
        className={`card note${this.state.isSelected ? ' fullscreen' : ''}`}
        style={{ backgroundColor: note.background }}
        onMouseEnter={this.hover}
        onMouseLeave={this.unhover}
        onClick={this.select}
        onBlur={this.deselect}
        tabIndex={0}>
        <div className="card-body">
          <h5>
            {note.status_id === 2
              ? 'ARCHIVED'
              : note.status_id === 3 ? 'DELETED' : ''}
          </h5>
          <h6 className="card-title">{note.title}</h6>
          <Todo todoList={note.contents} noteId={note.id} mode={note.mode} />

          <div className="tags">
            {tags.map(tag => (
              <span
                key={`tag-${note.id}-${tag.id}`}
                className="badge mr-1"
                style={{ backgroundColor: 'rgba(0,0,0,.1)' }}>
                {tag.title}
              </span>
            ))}
          </div>

          <div
            key={`note-${note.id}-toolbox`}
            className={`toolbox ${
              this.state.isHovered ? 'visible' : 'invisible'
            }`}>
            <Icon icon={handPointerO} size={20} className="toolbox-icon" />
            <Icon icon={ic_color_lens} size={20} className="toolbox-icon" />
            <Icon icon={ic_image} size={20} className="toolbox-icon" />
            <Icon
              icon={ic_archive}
              size={20}
              className="toolbox-icon"
              onClick={this.archive}
            />

            {/* Icon More options */}
            <span>
              <Icon
                icon={ic_more_vert}
                size={20}
                id={`toolbox-icon-dropdown-${note.id}`}
                className="toolbox-icon"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={e => e.stopPropagation()}
              />
              <div
                className="dropdown-menu"
                aria-labelledby={`toolbox-icon-dropdown-${note.id}`}>
                <div className="dropdown-item" onClick={this.delete}>
                  Xóa ghi chú
                </div>
                <div className="dropdown-item">Thay đổi nhãn</div>
                <div className="dropdown-item" onClick={this.clone}>
                  Tạo bản sao
                </div>
                <div className="dropdown-item" onClick={this.changeMode}>
                  Ẩn hộp kiểm
                </div>
              </div>
            </span>

            {!this.state.isSelected && (
              <Icon
                icon={ic_done}
                size={16}
                className="toolbox-icon icon-checkbox"
              />
            )}
            <Icon
              icon={pin}
              size={16}
              className="toolbox-icon icon-pinned"
              onClick={this.togglePinned}
            />
          </div>
        </div>
      </div>
    )
  }

  /** MOUSE EVENT - START */
  hover = () => {
    this.setState(state => ({
      ...state,
      isHovered: true
    }))
  }

  unhover = () => {
    this.setState(state => ({
      ...state,
      isHovered: false
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
  /** MOUSE EVENT - END */

  /** TOOLBOX ACTION - START */
  archive = e => {
    e.stopPropagation()

    this.props.onUpdate(this.props.note.id, { status_id: 2 })
  }

  delete = e => {
    e.stopPropagation()

    this.props.onUpdate(this.props.note.id, { status_id: 3 })
  }

  togglePinned = e => {
    e.stopPropagation()

    this.props.onUpdate(this.props.note.id, { pinned: !this.props.note.pinned })
  }

  // color
  // tag

  clone = e => {
    e.stopPropagation()

    const note = JSON.parse(JSON.stringify(this.props.note))
    delete note.id

    this.props.onCreateClone(note)
  }

  changeMode = e => {
    e.stopPropagation()

    this.props.onUpdate(this.props.note.id, {
      mode: this.props.note.mode !== 'check' ? '"check"' : '"text"'
    })
  }

  // remind

  /** TOOLBOX ACTION - END */
}

export default Note
