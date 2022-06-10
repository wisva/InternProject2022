import axios from "axios";
import {
  RESOURCE_ADD_REQUEST,
  RESOURCE_ADD_SUCCESS,
  RESOURCE_ADD_FAIL,
  RESOURCE_GET_REQUEST,
  RESOURCE_GET_SUCCESS,
  RESOURCE_GET_FAIL,
  RESOURCE_REQ_REQUEST,
  RESOURCE_REQ_SUCCESS,
  RESOURCE_REQ_FAIL,
  RESOURCE_ADMIN_GET_REQUEST,
  RESOURCE_ADMIN_GET_SUCCESS,
  RESOURCE_ADMIN_GET_FAIL,
  RESOURCE_ADMIN_GET_PARTICULAR_REQUEST,
  RESOURCE_ADMIN_GET_PARTICULAR_SUCCESS,
  RESOURCE_ADMIN_GET_PARTICULAR_FAIL,
  RESOURCE_EDIT_REQUEST,
  RESOURCE_EDIT_SUCCESS,
  RESOURCE_EDIT_FAIL,
  SCHEDULE_GET_REQUEST,
  SCHEDULE_GET_SUCCESS,
  SCHEDULE_GET_FAIL,
  REPORT_GET_REQUEST,
  REPORT_GET_SUCCESS,
  REPORT_GET_FAIL,
  SCHEDULE_DELETE_REQUEST,
  SCHEDULE_DELETE_SUCCESS,
  SCHEDULE_DELETE_FAIL,
  SCHEDULE_EDIT_REQUEST,
  SCHEDULE_EDIT_SUCCESS,
  SCHEDULE_EDIT_FAIL,
} from "../Constants/ResourceConstants";
const baseUrl = process.env.REACT_APP_API_URL;

export const generateReport = (type, id) => async (dispatch) => {
  try {
    dispatch({
      type: REPORT_GET_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${baseUrl}/api/admin/report/get/${type}/${id}`,
      config
    );

    dispatch({
      type: REPORT_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const scheduleDelete = (deletedId) => async (dispatch) => {
  try {
    dispatch({
      type: SCHEDULE_DELETE_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(
      `${baseUrl}/api/schedule/delete/${deletedId}`,
      config
    );

    dispatch({
      type: SCHEDULE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const scheduleEdit = (id, name) => async (dispatch) => {
  try {
    dispatch({
      type: SCHEDULE_EDIT_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${baseUrl}/api/schedule/edit/${id}`,
      name,
      config
    );

    dispatch({
      type: SCHEDULE_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resourceEdit = (id, name) => async (dispatch) => {
  try {
    dispatch({
      type: RESOURCE_EDIT_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${baseUrl}/api/admin/resource/edit/${id}`,
      { name: name, status: "1" },
      config
    );

    dispatch({
      type: RESOURCE_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESOURCE_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resourceParticularGet = (id) => async (dispatch) => {
  try {
    dispatch({
      type: RESOURCE_ADMIN_GET_PARTICULAR_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${baseUrl}/api/admin/resource/get/${id}`,
      config
    );

    dispatch({
      type: RESOURCE_ADMIN_GET_PARTICULAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESOURCE_ADMIN_GET_PARTICULAR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resourceGetAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: RESOURCE_ADMIN_GET_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${baseUrl}/api/admin/resource/list`,
      config
    );

    dispatch({
      type: RESOURCE_ADMIN_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESOURCE_ADMIN_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resourceRequest = (eventData) => async (dispatch) => {
  try {
    dispatch({
      type: RESOURCE_REQ_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${baseUrl}/api/teacher/resourcerequest`,
      eventData,
      config
    );

    dispatch({
      type: RESOURCE_REQ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESOURCE_REQ_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resourceGetClient = () => async (dispatch) => {
  try {
    dispatch({
      type: RESOURCE_GET_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${baseUrl}/api/teacher/resource`, config);

    dispatch({
      type: RESOURCE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESOURCE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const scheduleGet = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SCHEDULE_GET_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `${baseUrl}/api/teacher/scheduleGet/${id}`,
      config
    );

    dispatch({
      type: SCHEDULE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const resourceAdd = (name) => async (dispatch) => {
  try {
    dispatch({
      type: RESOURCE_ADD_REQUEST,
      loading: true,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${baseUrl}/api/admin/resource/add`,
      { name: name, status: "1" },
      config
    );

    dispatch({
      type: RESOURCE_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESOURCE_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
