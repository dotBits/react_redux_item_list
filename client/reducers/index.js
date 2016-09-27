import { combineReducers } from 'redux'
import active from './AppActiveComponent'
import user_list from './UserList'

const rootReducer = combineReducers({
  active,
  user_list,
})

export default rootReducer
