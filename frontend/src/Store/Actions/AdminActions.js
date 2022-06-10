import axios from "axios";
import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_RESET,
  ADMIN_LOGOUT_REQUEST,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_LOGOUT_FAIL,
  ADMIN_FORGOT_PASSWORD_REQUEST,
  ADMIN_FORGOT_PASSWORD_SUCCESS,
  ADMIN_FORGOT_PASSWORD_FAIL,
  ADMIN_RESET_PASSWORD_REQUEST,
  ADMIN_RESET_PASSWORD_SUCCESS,
  ADMIN_RESET_PASSWORD_FAIL,
  ADMIN_GET_REQUEST,
  ADMIN_GET_SUCCESS,
  ADMIN_GET_FAIL,
  ADMIN_APPROVE_REQUEST,
  ADMIN_APPROVE_SUCCESS,
  ADMIN_APPROVE_FAIL,
  ADMIN_DELETE_REQUEST,
  ADMIN_DELETE_SUCCESS,
  ADMIN_DELETE_FAIL,
} from "../Constants/AdminConstants";
const baseUrl = process.env.REACT_APP_API_URL;

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_DELETE_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(
      `${baseUrl}/api/admin/delete/${id}`,
      config
    );

    dispatch({
      type: ADMIN_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const approveUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_APPROVE_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${baseUrl}/api/admin/approve/${id}`,
      config
    );

    dispatch({
      type: ADMIN_APPROVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_APPROVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUsers = (type) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_GET_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${baseUrl}/api/admin/user/${type}`,
      config
    );

    dispatch({
      type: ADMIN_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminLogin = (account, secretCode) => async (dispatch) => {
  try {
    // dispatch({
    // 	type: LOADING_REQUEST,
    // 	loading: true
    // });
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${baseUrl}/api/admin/login`,
      { email: account, password: secretCode },
      config
    );

    const adminInfo = {
      token: data.token,
      user: data.data,
    };
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: adminInfo,
    });
    localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
    // dispatch({
    // 	type: LOADING_SUCCESS,
    // 	loading: false
    // });
  } catch (error) {
    // dispatch({
    // 	type: LOADING_SUCCESS,
    // 	loading: false
    // });
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.response.data.message,
    });
  }
};
