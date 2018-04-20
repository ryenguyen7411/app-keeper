import React from 'react'
import $ from 'jquery'
import 'bootstrap'
import _ from 'lodash'

import { DragSource, DropTarget } from 'react-dnd'

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

import { STATUS_ARCHIVED } from 'config/constants'
import { createNote } from 'config/graphPayload'

/** Drag and Drop */
const noteSource = {
  beginDrag(props) {
    return {
      noteId: props.note.id
    }
  }
}

const noteTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.note.id
    const sourceProps = monitor.getItem()
    const sourceId = sourceProps.noteId

    if (sourceId !== targetId) {
      targetProps.onMove({ sourceId, targetId })
    }
  }
}

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

function Todo({ todoList, noteId, mode, onChange, isEditable }) {
  function handleClick(e) {
    e.stopPropagation()
  }

  if (isEditable) {
    const text = todoList.map(todo => todo.todo).join('\n')
    return (
      <div onClickCapture={handleClick}>
        <form>
          <textarea autoFocus value={text} onChange={onChange} />
        </form>
      </div>
    )
  }
  return todoList
    .slice(0, 8)
    .map((todo, index) => (
      <TodoItem
        key={`todo-${noteId}-${index}`}
        className="card-text"
        index={index}
        todo={todo}
        mode={mode}
        onChange={onChange}
      />
    ))
}

function TodoItem({ className, index, todo, mode, onChange }) {
  const _className = `${className} ${
    mode === 'check' && todo.isChecked ? 'text-strike' : ''
  }`

  const handleChange = e => {
    e.stopPropagation()

    const target = e.target
    onChange(e, index, target.checked)
  }

  return (
    <form>
      <p className={_className}>
        {mode === 'check' && (
          <input
            type="checkbox"
            checked={todo.isChecked}
            onChange={handleChange}
          />
        )}
        {todo.todo}
      </p>
    </form>
  )
}

function ColorPalette({ colors, current, onChangeColor }) {
  const changeColor = e => {
    if (e.target.id) {
      onChangeColor(parseInt(e.target.id))
    }
  }
  return (
    <div className="row gutters-4 color-palette" onClick={changeColor}>
      {colors.map(color => (
        <div key={`color-${color.hex}`} className="col-3">
          <div
            id={color.id}
            className="color-palette-element"
            style={{ backgroundColor: color.hex }}>
            {color.id === current && <Icon icon={ic_done} size={24} />}
          </div>
        </div>
      ))}
    </div>
  )
}

class Note extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isHovered: false,
      isSelected: false,
      isShowColorPalette: false
    }
  }

  componentDidMount() {
    if (this.props.isEmpty) {
      return
    }

    const state = this.state
    const noteId = this.props.note.id
    const deselect = this.deselect

    // this.addEventListener('click', function(e) {
    //   console.log('TRIGGER')
    //   if (state.isSelected && e.target.id !== `note-${noteId}`) {
    //     deselect()
    //   }
    // })
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      note,
      tags,
      colors = [],
      isEmpty
    } = this.props

    if (isEmpty) {
      return <div>Input note</div>
    }

    const NoteElement = (
      <div
        id={`note-${note.id}`}
        className={`card note${this.state.isSelected ? ' fullscreen' : ''}`}
        style={{
          backgroundColor: note.color.hex,
          opacity: isDragging ? 0 : 1
        }}
        onMouseEnter={this.hover}
        onMouseLeave={this.unhover}
        onClick={this.select}
        // onBlur={this.deselect}
        tabIndex={0}>
        <div className="card-body">
          <h6 className="card-title">{note.title}</h6>
          <Todo
            todoList={note.contents}
            noteId={note.id}
            mode={note.mode}
            onChange={this.updateContents}
            isEditable={this.state.isSelected}
          />

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
              this.state.isHovered || this.state.isSelected
                ? 'visible'
                : 'invisible'
            }`}>
            <div className="icon">
              {/* <Icon icon={handPointerO} size={20} className="toolbox-icon" /> */}

              {/* Icon Color palette */}
              <span>
                <Icon
                  icon={ic_color_lens}
                  size={20}
                  id={`toolbox-icon-color-${note.id}`}
                  className="toolbox-icon"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onMouseEnter={this.showColorPalette}
                  onClick={e => e.stopPropagation()}
                />
                <div
                  className="dropdown-menu"
                  aria-labelledby={`toolbox-icon-color-${note.id}`}
                  style={{ width: '160px' }}>
                  <ColorPalette
                    colors={colors}
                    current={note.color.id}
                    onChangeColor={this.changeColor}
                  />
                </div>
              </span>

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
                    {note.mode === 'check' ? 'Ẩn hộp kiểm' : 'Hiện hộp kiểm'}
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
                className={`toolbox-icon icon-pinned ${
                  note.pinned === true ? 'visible' : ''
                }`}
                onClick={this.togglePinned}
              />
            </div>

            {this.state.isSelected && (
              <div className="close text-uppercase" onClick={this.deselect}>
                <p className="m-0">Đóng</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )

    return this.state.isSelected
      ? NoteElement
      : connectDragSource(connectDropTarget(NoteElement))
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

  deselect = e => {
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

    this.props.onUpdate(this.props.note.id, { status_id: STATUS_ARCHIVED })
  }

  delete = e => {
    e.stopPropagation()

    this.props.onDelete(this.props.note.id)
  }

  togglePinned = e => {
    e.stopPropagation()

    this.props.onUpdate(this.props.note.id, { pinned: !this.props.note.pinned })
  }

  changeColor = colorId => {
    this.props.onUpdate(this.props.note.id, { color_id: colorId })
  }

  // tag

  clone = e => {
    e.stopPropagation()

    /** VALIDATE CLONED NOTE - START */
    const note = JSON.parse(JSON.stringify(this.props.note))
    delete note.id
    note.contents = JSON.stringify(note.contents).replace(/"/g, '\\"')

    note.color_id = note.color ? note.color.id : 1
    delete note.color

    note.status_id = note.status ? note.status.id : 1
    delete note.status

    delete note.sort_value
    delete note.created_at
    delete note.updated_at
    /** VALIDATE CLONED NOTE - END */

    this.props.onCreateClone(note)
  }

  changeMode = e => {
    e.stopPropagation()

    this.props.onUpdate(this.props.note.id, {
      mode: this.props.note.mode !== 'check' ? 'check' : 'text'
    })
  }

  updateContents = (e, id, isChecked) => {
    e.stopPropagation()

    const targetTodo = _.find(
      this.props.note.contents,
      (n, index) => index === id
    )
    targetTodo.isChecked = isChecked

    // HOTFIX - USE REPLACE TO MAKE ADAPT QUERY STRING FOR GRAPHQL
    this.props.onUpdate(this.props.note.id, {
      contents: JSON.stringify(this.props.note.contents).replace(/"/g, '\\"')
    })
  }

  // remind

  /** TOOLBOX ACTION - END */
}

export default DragSource('Note', noteSource, collectSource)(
  DropTarget('Note', noteTarget, collectTarget)(Note)
)
