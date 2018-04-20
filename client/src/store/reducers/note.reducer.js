import _ from 'lodash'
import * as constants from 'config/constants'

const initialState = {}

const handlers = {
  [`${constants.NOTE_GRAPH}_REQUEST`]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [`${constants.NOTE_GRAPH}_SUCCESS`]: (state, action) => {
    if (action.response.callback.length) {
      const [func, params] = action.response.callback
      setTimeout(func.bind(null, params), 0)
    }

    let notes = state.notes

    if (action.response.data.notes) {
      action.response.data.notes = action.response.data.notes.map(note => {
        note.contents = JSON.parse(note.contents)
        return note
      })

      notes = action.response.data.notes
    }

    if (action.response.data.note) {
      const note = action.response.data.note
      note.contents = JSON.parse(note.contents)

      _.merge(_.find(notes, n => n.id === note.id), note)
    }

    return {
      ...state,
      isLoading: false,
      ...action.response.data,
      notes
    }
  },
  [`${constants.NOTE_GRAPH}_ERROR`]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...action.response.data
    }
  },
  [`${constants.MOVE_NOTE}`]: (state, action) => {
    const notes = state.notes
    const { sourceId, sourceIndex, targetIndex } = action.response.data

    if (sourceIndex === state.sourceIndex && targetIndex === state.targetIndex)
      return state

    const bp1 = sourceIndex < targetIndex ? sourceIndex : targetIndex

    const newNotes = notes
      .slice(0, bp1)
      .concat(notes.slice(bp1 + 1), notes.slice(bp1, bp1 + 1))

    return {
      ...state,
      notes: newNotes,
      sourceIndex,
      targetIndex
    }
  }
}

const reducer = (state = initialState, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return state
}

export default reducer
