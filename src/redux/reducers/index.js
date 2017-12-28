import auctions from './auctions'
import user from './user'
import files from './files'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { pendingTasksReducer } from 'react-redux-spinner'

export default combineReducers({
    // api: apiData,
    auctions,
    user,
    files,
    routing: routerReducer,
    pendingTasks: pendingTasksReducer
});