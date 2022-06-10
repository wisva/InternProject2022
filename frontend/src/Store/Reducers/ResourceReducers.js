import {
  RESOURCE_ADD_REQUEST,
  RESOURCE_ADD_SUCCESS,
  RESOURCE_ADD_FAIL,
  RESOURCE_ADD_RESET,
  RESOURCE_GET_REQUEST,
  RESOURCE_GET_SUCCESS,
  RESOURCE_GET_FAIL,
  RESOURCE_GET_RESET,
  RESOURCE_REQ_REQUEST,
  RESOURCE_REQ_SUCCESS,
  RESOURCE_REQ_FAIL,
  RESOURCE_REQ_RESET,
  RESOURCE_ADMIN_GET_REQUEST,
  RESOURCE_ADMIN_GET_SUCCESS,
  RESOURCE_ADMIN_GET_FAIL,
  RESOURCE_ADMIN_GET_RESET,
  RESOURCE_ADMIN_GET_PARTICULAR_REQUEST,
  RESOURCE_ADMIN_GET_PARTICULAR_SUCCESS,
  RESOURCE_ADMIN_GET_PARTICULAR_FAIL,
  RESOURCE_ADMIN_GET_PARTICULAR_RESET,
  RESOURCE_EDIT_REQUEST,
  RESOURCE_EDIT_SUCCESS,
  RESOURCE_EDIT_FAIL,
  RESOURCE_EDIT_RESET,
  SCHEDULE_GET_REQUEST,
  SCHEDULE_GET_SUCCESS,
  SCHEDULE_GET_FAIL,
  SCHEDULE_GET_RESET,
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

export const scheduleDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case SCHEDULE_DELETE_REQUEST:
      return { loading: true };
    case SCHEDULE_DELETE_SUCCESS:
      return { loading: false, resource: action.payload };
    case SCHEDULE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const scheduleEditReducers = (state = {}, action) => {
  switch (action.type) {
    case SCHEDULE_EDIT_REQUEST:
      return { loading: true };
    case SCHEDULE_EDIT_SUCCESS:
      return { loading: false, resource: action.payload };
    case SCHEDULE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const reportGetReducers = (state = {}, action) => {
  switch (action.type) {
    case REPORT_GET_REQUEST:
      return { loading: true };
    case REPORT_GET_SUCCESS:
      return { loading: false, resource: action.payload };
    case REPORT_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const scheduleGetReducers = (state = {}, action) => {
  switch (action.type) {
    case SCHEDULE_GET_REQUEST:
      return { loading: true };
    case SCHEDULE_GET_SUCCESS:
      return { loading: false, resource: action.payload };
    case SCHEDULE_GET_FAIL:
      return { loading: false, error: action.payload };
    case SCHEDULE_GET_RESET:
      return { loading: false, resource: {} };
    default:
      return state;
  }
};

export const resourceEditReducers = (state = {}, action) => {
  switch (action.type) {
    case RESOURCE_EDIT_REQUEST:
      return { loading: true };
    case RESOURCE_EDIT_SUCCESS:
      return { loading: false, resource: action.payload };
    case RESOURCE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case RESOURCE_EDIT_RESET:
      return { loading: false, resource: {} };
    default:
      return state;
  }
};

export const resourceAdminParticularListReducers = (state = {}, action) => {
  switch (action.type) {
    case RESOURCE_ADMIN_GET_PARTICULAR_REQUEST:
      return { loading: true };
    case RESOURCE_ADMIN_GET_PARTICULAR_SUCCESS:
      return { loading: false, resource: action.payload };
    case RESOURCE_ADMIN_GET_PARTICULAR_FAIL:
      return { loading: false, error: action.payload };
    case RESOURCE_ADMIN_GET_PARTICULAR_RESET:
      return { loading: false, resource: {} };
    default:
      return state;
  }
};

export const resourceAdminListReducers = (state = {}, action) => {
  switch (action.type) {
    case RESOURCE_ADMIN_GET_REQUEST:
      return { loading: true };
    case RESOURCE_ADMIN_GET_SUCCESS:
      return { loading: false, resource: action.payload };
    case RESOURCE_ADMIN_GET_FAIL:
      return { loading: false, error: action.payload };
    case RESOURCE_ADMIN_GET_RESET:
      return { loading: false, resource: {} };
    default:
      return state;
  }
};

export const resourceRequestReducers = (state = {}, action) => {
  switch (action.type) {
    case RESOURCE_REQ_REQUEST:
      return { loading: true };
    case RESOURCE_REQ_SUCCESS:
      return { loading: false, resource: action.payload };
    case RESOURCE_REQ_FAIL:
      return { loading: false, error: action.payload };
    case RESOURCE_REQ_RESET:
      return { loading: false, resource: {} };
    default:
      return state;
  }
};

export const resourceGetReducers = (state = {}, action) => {
  switch (action.type) {
    case RESOURCE_GET_REQUEST:
      return { loading: true };
    case RESOURCE_GET_SUCCESS:
      return { loading: false, resource: action.payload };
    case RESOURCE_GET_FAIL:
      return { loading: false, error: action.payload };
    case RESOURCE_GET_RESET:
      return { loading: false, resource: {} };
    default:
      return state;
  }
};

export const resourceAddReducers = (state = {}, action) => {
  switch (action.type) {
    case RESOURCE_ADD_REQUEST:
      return { loading: true };
    case RESOURCE_ADD_SUCCESS:
      return { loading: false, resource: action.payload };
    case RESOURCE_ADD_FAIL:
      return { loading: false, error: action.payload };
    case RESOURCE_ADD_RESET:
      return { loading: false, resource: {} };
    default:
      return state;
  }
};
