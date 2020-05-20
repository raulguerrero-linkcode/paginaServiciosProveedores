import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import Firebase from './server'
import { FirebaseContext } from './server/index'

import { initialState } from './session/initialState'
import { StateProvider } from './session/store'
import { mainReducer } from  './session/reducers/index'

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase}>
      <StateProvider initialState={initialState} reducer={mainReducer}>
        <App />
      </StateProvider>
    </FirebaseContext.Provider>
    ,document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
