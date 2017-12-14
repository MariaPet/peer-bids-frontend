import apiData from './apiData'
import auctions from './auctions'
import { combineReducers } from 'redux'
import {routerReducer } from 'react-router-redux'

// export default function combineReducer(currentState, action) {
//     var nextState = {...currentState};
//     return {
//         api: apiData(nextState.api, action)
//     }
// }

export default combineReducers({
    api: apiData,
    auctions,
    routing: routerReducer
});