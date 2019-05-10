import {
  GET_MOVIES_START, GET_MOVIES_SUCCESS, GET_MOVIES_FAILURE,
  GET_LIKED_MOVIES_START, GET_LIKED_MOVIES_SUCCESS, GET_LIKED_MOVIES_FAILURE,
  USER_LIKE_MOVIE, USER_UNLIKE_MOVIE
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
    case USER_LIKE_MOVIE:
      const ml1 = state.movielist.map(movie => movie.id === action.data ? { ...movie, userLikeMovie: true } : movie)
      return {
        ...state,
        movielist: ml1
      }
    case USER_UNLIKE_MOVIE:
      const ml2 = state.movielist.map(movie => movie.id === action.data ? { ...movie, userLikeMovie: true } : movie)
      return {
        ...state,
        movielist: ml2
      }
    default:
      return state
  }
}