import axios from "axios";
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
const baseUrl = process.env.REACT_APP_API_URL;

export const userUpdate = (user, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
      loading: true,
    });
    const {
      userData: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${baseUrl}/api/userUpdate/${id}`,
      user,
      config
    );

    const userIn = {
      token: userInfo.token,
      user: data.data,
    };
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: userIn,
    });
    if (data && data.data) {
      localStorage.setItem("userInfo", JSON.stringify(userIn));
    }
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.response.data.message,
    });
  }
};

export const userParticularGet = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PARTICULAR_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${baseUrl}/api/user/get/${id}`, config);

    dispatch({
      type: USER_PARTICULAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PARTICULAR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const studentRegister =
  (name, account, secretCode, type, school, clas) => async (dispatch) => {
    try {
      // dispatch({
      // 	type: LOADING_REQUEST,
      // 	loading: true
      // });
      dispatch({
        type: USER_REGISTER_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (type == "teacher") {
        const { data } = await axios.post(
          `${baseUrl}/api/register`,
          {
            name: name,
            email: account,
            password: secretCode,
            type: type,
            school: school,
          },
          config
        );

        const userInfo = {
          token: data.token,
          user: data.data,
        };
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: userInfo,
        });
      } else {
        const { data } = await axios.post(
          `${baseUrl}/api/register`,
          {
            name: name,
            email: account,
            password: secretCode,
            type: type,
            school: school,
            clas: clas,
          },
          config
        );

        const userInfo = {
          token: data.token,
          user: data.data,
        };
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: userInfo,
        });
      }

      // dispatch({
      // 	type: LOADING_SUCCESS,
      // 	loading: false
      // });
    } catch (error) {
      // dispatch({
      // 	type: LOADING_SUCCESS,
      // 	loading: false
      // });
      console.log(error.response);
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.response.data.message,
      });
    }
  };

export const studentLogin = (account, secretCode) => async (dispatch) => {
  try {
    // dispatch({
    // 	type: LOADING_REQUEST,
    // 	loading: true
    // });
    dispatch({
      type: USER_LOGIN_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${baseUrl}/api/login`,
      { email: account, password: secretCode },
      config
    );

    const userInfo = {
      token: data.token,
      user: data.data,
    };
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userInfo,
    });
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    // dispatch({
    // 	type: LOADING_SUCCESS,
    // 	loading: false
    // });
  } catch (error) {
    console.log(error, "error");
    // dispatch({
    // 	type: LOADING_SUCCESS,
    // 	loading: false
    // });
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.response.data.message,
    });
  }
};
