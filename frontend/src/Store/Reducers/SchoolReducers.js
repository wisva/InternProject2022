import {
  SCHOOL_ADD_REQUEST,
  SCHOOL_ADD_SUCCESS,
  SCHOOL_ADD_FAIL,
  SCHOOL_ADD_RESET,
  SCHOOL_GET_REQUEST,
  SCHOOL_GET_SUCCESS,
  SCHOOL_GET_FAIL,
  SCHOOL_GET_RESET,
  SCHOOL_GET_ADMIN_REQUEST,
  SCHOOL_GET_ADMIN_SUCCESS,
  SCHOOL_GET_ADMIN_FAIL,
  SCHOOL_GET_ADMIN_RESET,
  SCHOOL_PARTICULAR_REQUEST,
  SCHOOL_PARTICULAR_SUCCESS,
  SCHOOL_PARTICULAR_FAIL,
  SCHOOL_PARTICULAR_RESET,
  SCHOOL_EDIT_REQUEST,
  SCHOOL_EDIT_SUCCESS,
  SCHOOL_EDIT_FAIL,
  SCHOOL_EDIT_RESET,
  STUDENTS_GET_REQUEST,
  STUDENTS_GET_SUCCESS,
  STUDENTS_GET_FAIL,
} from "../Constants/SchoolConstants";

export const studentsGetReducers = (state = {}, action) => {
  switch (action.type) {
    case STUDENTS_GET_REQUEST:
      return { loading: true };
    case STUDENTS_GET_SUCCESS:
      return { loading: false, school: action.payload };
    case STUDENTS_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const schoolEditReducers = (state = {}, action) => {
  switch (action.type) {
    case SCHOOL_EDIT_REQUEST:
      return { loading: true };
    case SCHOOL_EDIT_SUCCESS:
      return { loading: false, school: action.payload };
    case SCHOOL_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case SCHOOL_EDIT_RESET:
      return { loading: false, school: {} };
    default:
      return state;
  }
};

export const schoolParticularReducers = (state = {}, action) => {
  switch (action.type) {
    case SCHOOL_PARTICULAR_REQUEST:
      return { loading: true };
    case SCHOOL_PARTICULAR_SUCCESS:
      return { loading: false, school: action.payload };
    case SCHOOL_PARTICULAR_FAIL:
      return { loading: false, error: action.payload };
    case SCHOOL_PARTICULAR_RESET:
      return { loading: false, school: {} };
    default:
      return state;
  }
};

export const schoolListReducers = (state = {}, action) => {
  switch (action.type) {
    case SCHOOL_GET_REQUEST:
      return { loading: true };
    case SCHOOL_GET_SUCCESS:
      return { loading: false, school: action.payload };
    case SCHOOL_GET_FAIL:
      return { loading: false, error: action.payload };
    case SCHOOL_GET_RESET:
      return { loading: false, school: {} };
    default:
      return state;
  }
};

export const schoolGetReducers = (state = {}, action) => {
  switch (action.type) {
    case SCHOOL_GET_ADMIN_REQUEST:
      return { loading: true };
    case SCHOOL_GET_ADMIN_SUCCESS:
      return { loading: false, school: action.payload };
    case SCHOOL_GET_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case SCHOOL_GET_ADMIN_RESET:
      return { loading: false, school: {} };
    default:
      return state;
  }
};

export const schoolAdminGetReducers = (state = {}, action) => {
  switch (action.type) {
    case SCHOOL_ADD_REQUEST:
      return { loading: true };
    case SCHOOL_ADD_SUCCESS:
      return { loading: false, school: action.payload };
    case SCHOOL_ADD_FAIL:
      return { loading: false, error: action.payload };
    case SCHOOL_ADD_RESET:
      return { loading: false, school: {} };
    default:
      return state;
  }
};

export const schoolAdminReducers = (state = {}, action) => {
  switch (action.type) {
    case SCHOOL_ADD_REQUEST:
      return { loading: true };
    case SCHOOL_ADD_SUCCESS:
      return { loading: false, school: action.payload };
    case SCHOOL_ADD_FAIL:
      return { loading: false, error: action.payload };
    case SCHOOL_ADD_RESET:
      return { loading: false, school: {} };
    default:
      return state;
  }
};
