import * as constants from 'config/constants'

/** PRODUCT GRAPH */
export function noteGraphRequest() {
  return dispatch => {
    dispatch({
      type: `${constants.NOTE_GRAPH}_REQUEST`,
    })
  }
}

export function noteGraphSuccess(data) {
  return dispatch => {
    dispatch({
      type: `${constants.NOTE_GRAPH}_SUCCESS`,
      response: data
    })
  }
}

export function noteGraphError(data) {
  return dispatch => {
    dispatch({
      type: `${constants.NOTE_GRAPH}_ERROR`,
      response: data
    })
  }
}
