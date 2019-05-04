import {
    GET_USER_INFO_START, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE,
    LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE
} from '../constants/actionTypes'

const INITIAL_STATE = {
    status: '',
    userInfo: {},
    token: ''
}

export default function user(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_USER_INFO_START:
            return {
                ...state,
                status: action.type,
            }
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                status: action.type,
                userInfo: action.data,
            }
        case GET_USER_INFO_FAILURE:
            return {
                ...state,
                status: action.type,
            }
        case LOGIN_START:
            return {
                ...state,
                status: action.type
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                status: action.type,
                token: action.data.token
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                status: action.type
            }
        default:
            return state
    }
}
