import Taro from '@tarojs/taro'
import fly from '../constants/fly'
import {
  GET_USER_INFO_START, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE,
  LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE
} from '../constants/actionTypes'
import { getMovieList } from './movies'

export const getUserInfoStart = () => {
  return {
    type: GET_USER_INFO_START
  }
}
export const getUserInfoSuccess = (data) => {
  return {
    type: GET_USER_INFO_SUCCESS,
    data: data
  }
}
export const getUserInfoFailure = (err) => {
  return {
    type: GET_USER_INFO_FAILURE,
    error: err
  }
}

export const loginStart = () => {
  return {
    type: LOGIN_START
  }
}
export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data: data
  }
}
export const loginFailure = (err) => {
  return {
    type: LOGIN_FAILURE,
    error: err
  }
}

// 异步的action
export function getUserInfo() {
  return async dispatch => {
    dispatch(getUserInfoStart());
    try {
      let rsp = await Taro.getUserInfo()
      let userInfo = rsp.userInfo;
      dispatch(getUserInfoSuccess(userInfo));
    } catch (error) {
      dispatch(getUserInfoFailure(error));
    }
  }
}

// 异步的action
export function loginAndInitMovieList() {
  return async dispatch => {
    dispatch(loginStart());
    try {
      let res = await Taro.login();
      let code = res.code;
      let rsp = await fly.post('/api/login', {
        code
      });
      let data = rsp.data.data;
      Taro.setStorageSync('jwt', data.token);
      dispatch(loginSuccess(data));
      dispatch(getMovieList())
    } catch (error) {
      dispatch(loginFailure(error));
    }
  }
}
