import users from './users'
import channels from './channels'
import blocks from './blocks'
import { combineReducers } from 'redux'

export default combineReducers({
  users,
  channels, 
  blocks
})
