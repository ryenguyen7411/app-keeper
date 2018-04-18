import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import routes from 'config/routes'

class App extends React.Component {
    render() {
        return (
            <Router>{routes}</Router>
        )
    }
}

export default App
