import * as constants from 'config/constants'

const initialState = {
  notes: [],
  noteTags: []
}

const handlers = {
  [`${constants.NOTE_GRAPH}_REQUEST`]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [`${constants.NOTE_GRAPH}_SUCCESS`]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...action.response.data
    }
  },
  [`${constants.NOTE_GRAPH}_ERROR`]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...action.response.data
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
