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

/** UPDATE LOCAL NOTE - START */
export function updateLocalNoteSuccess(data) {
  return dispatch => {
    dispatch({
      type: `${constants.UPDATE_LOCAL_NOTE}`,
      response: data
    })
  }
}
/** UPDATE LOCAL NOTE - END */
