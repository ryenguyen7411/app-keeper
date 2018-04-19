import axios from 'axios'

import * as actions from 'actions/note.action'
import * as constants from 'config/constants'

import config from 'config/config'

export function noteGraph(payload) {
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
        dispatch(actions.noteGraphSuccess(response.data))
      else dispatch(actions.noteGraphError(response.error))
    })
  }
}

// export async function noteGraph(payload) {
//   return dispatch => {
//     dispatch(actions.noteGraphRequest())

//     const response = function(resolve, reject) {
//       let request = new XMLHttpRequest()
//       request.open('POST', `${config.serverUrl}/graphiql`, true)
//       request.setRequestHeader('Content-Type', 'application/graphql')
//       request.send(payload)

//       request.onreadystatechange = () => {
//         if (request.readyState === constants.XML_STATE_DONE) {
//           resolve(request.responseText)
//         }
//       }
//     }

//     dispatch(actions.noteGraphSuccess(JSON.parse(response)))
//   }
// }
