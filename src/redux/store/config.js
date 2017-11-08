import { createStore, applyMiddleware } from 'redux'
import combineReducer from '../reducers/index'
import {crashReporter} from '../middlewares/index'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'

const store = createStore(combineReducer, 
    applyMiddleware(createLogger(), crashReporter, thunk));

export default store;