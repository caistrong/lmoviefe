import { combineReducers } from 'redux'
import movies from './movies'
import user from './user'

export default combineReducers({
  movies,
  user
})
