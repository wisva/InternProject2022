import axios from "axios";
import {
  SCHOOL_ADD_REQUEST,
  SCHOOL_ADD_SUCCESS,
  SCHOOL_ADD_FAIL,
  SCHOOL_GET_REQUEST,
  SCHOOL_GET_SUCCESS,
  SCHOOL_GET_FAIL,
  SCHOOL_GET_ADMIN_REQUEST,
  SCHOOL_GET_ADMIN_SUCCESS,
  SCHOOL_GET_ADMIN_FAIL,
  SCHOOL_PARTICULAR_REQUEST,
  SCHOOL_PARTICULAR_SUCCESS,
  SCHOOL_PARTICULAR_FAIL,
  SCHOOL_EDIT_REQUEST,
  SCHOOL_EDIT_SUCCESS,
  SCHOOL_EDIT_FAIL,
  STUDENTS_GET_REQUEST,
  STUDENTS_GET_SUCCESS,
  STUDENTS_GET_FAIL,
} from "../Constants/SchoolConstants";
const baseUrl = process.env.REACT_APP_API_URL;

export const studentsGet = (school, type) => async (dispatch) => {
  try {
    dispatch({
      type: STUDENTS_GET_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${baseUrl}/api/students/${school}/${type}`,
      config
    );

    dispatch({
      type: STUDENTS_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENTS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const schoolEdit = (id, name) => async (dispatch) => {
  try {
    dispatch({
      type: SCHOOL_EDIT_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${baseUrl}/api/admin/school/edit/${id}`,
      { name: name },
      config
    );

    dispatch({
      type: SCHOOL_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHOOL_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const schoolParticularGet = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SCHOOL_PARTICULAR_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${baseUrl}/api/admin/school/get/${id}`,
      config
    );

    dispatch({
      type: SCHOOL_PARTICULAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHOOL_PARTICULAR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const schoolGetAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: SCHOOL_GET_ADMIN_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${baseUrl}/api/admin/schoolGet`, config);

    dispatch({
      type: SCHOOL_GET_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHOOL_GET_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const schoolGet = () => async (dispatch) => {
  try {
    dispatch({
      type: SCHOOL_GET_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${baseUrl}/api/school/get`, config);

    dispatch({
      type: SCHOOL_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHOOL_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const schoolAdd = (name) => async (dispatch) => {
  try {
    dispatch({
      type: SCHOOL_ADD_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${baseUrl}/api/admin/schoolAdd`,
      { name: name },
      config
    );

    dispatch({
      type: SCHOOL_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHOOL_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
