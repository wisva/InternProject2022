import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_RESET,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_PARTICULAR_REQUEST,
  USER_PARTICULAR_SUCCESS,
  USER_PARTICULAR_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../Constants/UserConstants";

export const userUpdateReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const UserParticularReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_PARTICULAR_REQUEST:
      return { loading: true };
    case USER_PARTICULAR_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_PARTICULAR_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const UserLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGIN_RESET:
      return { loading: false, userInfo: {} };
    default:
      return state;
  }
};

export const UserRegisterReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return { loading: false, userInfo: {} };
    default:
      return state;
  }
};
