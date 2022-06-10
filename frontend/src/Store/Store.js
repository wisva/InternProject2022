import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  AdminLoginReducers,
  AdminGetReducers,
  AdminApproveReducers,
  AdminDeleteReducers,
} from "./Reducers/AdminReducers";
import {
  schoolAdminReducers,
  schoolEditReducers,
  schoolParticularReducers,
  schoolListReducers,
  schoolGetReducers,
  studentsGetReducers,
} from "./Reducers/SchoolReducers";
import {
  resourceAddReducers,
  resourceGetReducers,
  resourceRequestReducers,
  resourceAdminListReducers,
  resourceAdminParticularListReducers,
  resourceEditReducers,
  scheduleGetReducers,
  reportGetReducers,
  scheduleEditReducers,
  scheduleDeleteReducers,
} from "./Reducers/ResourceReducers";
import {
  UserLoginReducers,
  UserRegisterReducers,
  UserParticularReducers,
  userUpdateReducers,
} from "./Reducers/UserReducers";
const middleware = [thunk];

const reducer = combineReducers({
  adminData: AdminLoginReducers,
  adminUsers: AdminGetReducers,
  adminApprove: AdminApproveReducers,
  AdminDelete: AdminDeleteReducers,
  userData: UserLoginReducers,
  userRegister: UserRegisterReducers,
  userParticular: UserParticularReducers,
  userUpdate: userUpdateReducers,
  schoolAdd: schoolAdminReducers,
  schoolEdit: schoolEditReducers,
  schoolParticular: schoolParticularReducers,
  schoolList: schoolListReducers,
  studentsGet: studentsGetReducers,
  schoolGet: schoolGetReducers,
  resourceAdd: resourceAddReducers,
  resourceGet: resourceGetReducers,
  scheduleGet: scheduleGetReducers,
  scheduleEdit: scheduleEditReducers,
  scheduleDelete: scheduleDeleteReducers,
  reportGet: reportGetReducers,
  resourceRequest: resourceRequestReducers,
  resourceAdminList: resourceAdminListReducers,
  resourceAdminParticularList: resourceAdminParticularListReducers,
  resourceEdit: resourceEditReducers,
});

const userDataFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const adminDataFromStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const initialState = {
  userData: { userInfo: userDataFromStorage },
  adminData: { adminInfo: adminDataFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
