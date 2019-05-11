import {
  USER_LIKE_MOVIE, USER_UNLIKE_MOVIE
} from '../constants/actionTypes'

export const userLikeMovie = (data) => {
  return {
    type: USER_LIKE_MOVIE,
    data
  }
}
export const userUnlikeMovie = (data) => {
  return {
    type: USER_UNLIKE_MOVIE,
    data
  }
}
