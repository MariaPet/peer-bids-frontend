import auctions from './auctions'
import user from './user'
import files from './files'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { pendingTasksReducer } from 'react-redux-spinner'
import realtimeBid from './realtimeBids'
import productDetails from './productDetails'

export default combineReducers({
    // api: apiData,
    auctions,
    realtimeBid,
    productDetails,
    user,
    files,
    routing: routerReducer,
    pendingTasks: pendingTasksReducer
});