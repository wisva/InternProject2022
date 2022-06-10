import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_RESET,
  ADMIN_GET_REQUEST,
  ADMIN_GET_SUCCESS,
  ADMIN_GET_FAIL,
  ADMIN_APPROVE_REQUEST,
  ADMIN_APPROVE_SUCCESS,
  ADMIN_APPROVE_FAIL,
  ADMIN_LOGOUT_REQUEST,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_LOGOUT_FAIL,
  ADMIN_LOGOUT_RESET,
  ADMIN_FORGOT_PASSWORD_REQUEST,
  ADMIN_FORGOT_PASSWORD_SUCCESS,
  ADMIN_FORGOT_PASSWORD_FAIL,
  ADMIN_FORGOT_PASSWORD_RESET,
  ADMIN_RESET_PASSWORD_REQUEST,
  ADMIN_RESET_PASSWORD_SUCCESS,
  ADMIN_RESET_PASSWORD_FAIL,
  ADMIN_DELETE_REQUEST,
  ADMIN_DELETE_SUCCESS,
  ADMIN_DELETE_FAIL,
} from "../Constants/AdminConstants";

export const AdminDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_REQUEST:
      return { loading: true };
    case ADMIN_DELETE_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AdminApproveReducers = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_APPROVE_REQUEST:
      return { loading: true };
    case ADMIN_APPROVE_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_APPROVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AdminGetReducers = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_GET_REQUEST:
      return { loading: true };
    case ADMIN_GET_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AdminLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { loading: true };
    case ADMIN_LOGIN_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_LOGIN_RESET:
      return { loading: false, adminInfo: {} };
    default:
      return state;
  }
};
