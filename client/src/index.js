import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from 'store'

import registerServiceWorker from './registerServiceWorker'
import App from 'config/app'
import 'sass/main.scss'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
