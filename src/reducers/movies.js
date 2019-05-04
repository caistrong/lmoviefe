import {
  GET_MOVIES_START, GET_MOVIES_SUCCESS, GET_MOVIES_FAILURE,
  GET_LIKED_MOVIES_START, GET_LIKED_MOVIES_SUCCESS, GET_LIKED_MOVIES_FAILURE
} from '../constants/actionTypes'

const INITIAL_STATE = {
  status: '',
  movielist: [],
  getLikedMoviesStatus: '',
  likedMovieList: []
}

export default function movies(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_MOVIES_START:
      return {
        ...state,
        status: action.type,
      }
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        status: action.type,
        movielist: action.data,
      }
    case GET_MOVIES_FAILURE:
      return {
        ...state,
        status: action.type,
      }
    case GET_LIKED_MOVIES_START:
      return {
        ...state,
        getLikedMoviesStatus: action.type
      }
    case GET_LIKED_MOVIES_SUCCESS:
      return {
        ...state,
        getLikedMoviesStatus: action.type,
        likedMovieList: action.data
      }
    case GET_LIKED_MOVIES_FAILURE:
      return {
        ...state,
        getLikedMoviesStatus: action.type
      }
    default:
      return state
  }
}