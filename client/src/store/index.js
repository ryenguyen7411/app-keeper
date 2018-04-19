import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import noteReducer from './reducers/note.reducer'

const store = combineReducers({
  noteReducer
})

export default createStore(store, composeWithDevTools(applyMiddleware(thunk)))
