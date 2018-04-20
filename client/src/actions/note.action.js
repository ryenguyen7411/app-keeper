import * as constants from 'config/constants'

/** NOTE GRAPH - START */
export function noteGraphRequest() {
  return dispatch => {
    dispatch({
      type: `${constants.NOTE_GRAPH}_REQUEST`
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
/** NOTE GRAPH - END */

/** MOVE NOTE - START */
export function moveNote(data) {
  return dispatch => {
    dispatch({
      type: `${constants.MOVE_NOTE}`,
      response: data
    })
  }
}
/** MOVE NOTE - END */
