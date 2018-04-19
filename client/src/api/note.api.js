import axios from 'axios'

import * as actions from 'actions/note.action'
import * as constants from 'config/constants'

import config from 'config/config'

export function noteGraph(payload, ...callback) {
  return dispatch => {
    dispatch(actions.noteGraphRequest())

    axios({
      url: `${config.serverUrl}/graphiql`,
      method: 'post',
      data: {
        query: payload
      }
    }).then(response => {
      if (response.status === constants.STATUS_OK)
        dispatch(
          actions.noteGraphSuccess({ ...response.data, callback: callback })
        )
      else dispatch(actions.noteGraphError(response.error))
    })
  }
}

export function updateLocalNote(noteId, updatedAttributes) {
  return dispatch => {
    dispatch(actions.updateLocalNote({ noteId, updatedAttributes }))
  }
}
