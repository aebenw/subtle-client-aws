import users from './users'
import channels from './channels'
import { combineReducers } from 'redux'

export default combineReducers({
  users,
  channels
})
