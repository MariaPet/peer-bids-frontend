import auctions from './auctions'
import user from './user'
import { combineReducers } from 'redux'
import {routerReducer } from 'react-router-redux'

export default combineReducers({
    // api: apiData,
    auctions,
    user,
    routing: routerReducer
});