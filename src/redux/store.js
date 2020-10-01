import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import apiMiddleware from '../middlewares/apiMiddleware';
import initialState from './initialState';
import rootReducer from './reducers';

const middleware = [apiMiddleware];

const store = createStore(
  combineReducers(rootReducer),
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

// expose store when run in Cypress
// if (window.Cypress) {
window.store = store;
// }

export default store;
