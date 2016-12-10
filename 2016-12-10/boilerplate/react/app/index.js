import React from 'react'
import { render } from 'react-dom'
import App from './containers/app'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'


let store = createStore(combineReducers({
    ...reducers,
    routing: routerReducer
  }), applyMiddleware(thunk))

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
     <Router history={history}>
      <Route path="/" component={App}>        
      </Route>
    </Router>
  </Provider>,
  document.getElementById('react-container')
)
