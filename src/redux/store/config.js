import { createStore, applyMiddleware, compose } from 'redux'
import combineReducer from '../reducers/index'
import {crashReporter} from '../middlewares/index'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducer, composeEnhancers(
    applyMiddleware(createLogger(), crashReporter, thunk))
);

export default store;