import fly from '../constants/fly'
import {
  GET_MOVIES_START, GET_MOVIES_SUCCESS, GET_MOVIES_FAILURE,
  GET_LIKED_MOVIES_START, GET_LIKED_MOVIES_SUCCESS, GET_LIKED_MOVIES_FAILURE
} from '../constants/actionTypes'

export const getMoviesStart = () => {
  return {
    type: GET_MOVIES_START
  }
}
export const getMoviesSuccess = (data) => {
  return {
    type: GET_MOVIES_SUCCESS,
    data: data
  }
}
export const getMoviesFailure = (err) => {
  return {
    type: GET_MOVIES_FAILURE,
    error: err
  }
}

export const getLikedMoviesStart = () => {
  return {
    type: GET_LIKED_MOVIES_START
  }
}
export const getLikedMoviesSuccess = (data) => {
  return {
    type: GET_LIKED_MOVIES_SUCCESS,
    data: data
  }
}
export const getLikedMoviesFailure = (err) => {
  return {
    type: GET_LIKED_MOVIES_FAILURE,
    error: err
  }
}

// 异步的action
export function getMovieList() {
  return async dispatch => {
    dispatch(getMoviesStart());
    try {
      let rsp = await fly.get('/api/movies');
      let rspBody = rsp.data;
      let movielist = rspBody.data; // 之后有数据了再加上推荐
      dispatch(getMoviesSuccess(movielist));
    } catch (error) {
      dispatch(getMoviesFailure(error));
    }
  }
}

export function getLikedMovieList() {
  return async dispatch => {
    dispatch(getLikedMoviesStart());
    try {
      let rsp = await fly.get('/api/liked_movies');
      let rspBody = rsp.data;
      let movielist = rspBody.data; // 之后有数据了再加上推荐
      dispatch(getLikedMoviesSuccess(movielist));
    } catch (error) {
      dispatch(getLikedMoviesFailure(error));
    }
  }
}
