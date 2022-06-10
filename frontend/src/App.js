import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./Pages/Admin/Login/Login";
import Info from "./Pages/Info/info";
import AdminDashboard from "./Pages/Admin/Dashboard/Index";
import SchoolList from "./Components/Admin/School/List";
import SchoolAdd from "./Components/Admin/School/Add";
import SchoolEdit from "./Components/Admin/School/Edit";
import TeacherLogin from "./Pages/Client/TeacherLogin/Login";
import TeacherRegister from "./Pages/Client/TeacherRegister/Register";
import StudentLogin from "./Pages/Client/UserLogin/Login";
import StudentRegister from "./Pages/Client/UserRegister/Register";
import Home from "./Pages/Client/Home/Home";
import TeacherHome from "./Pages/Client/TeacherHome/TeacherHome";
import StudentHome from "./Pages/Client/StudentHome/StudentHome";
import Students from "./Pages/Students/Students";
import Settings from "./Pages/Settings/Settings";
import store from "./Store/Store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route exact path="/teacher/login" element={<TeacherLogin />} />
            <Route
              exact
              path="/teacher/register"
              element={<TeacherRegister />}
            />
            <Route exact path="/student/login" element={<StudentLogin />} />
            <Route
              exact
              path="/student/register"
              element={<StudentRegister />}
            />
            <Route exact path="/admin" element={<AdminLogin />} />
            <Route exact path="/info" element={<Info />} />
            <Route
              exact
              path="/admin/dashboard/*"
              element={<AdminDashboard />}
            />
            <Route exact path="/admin/school" element={<SchoolList />} />
            <Route exact path="/admin/school/add" element={<SchoolAdd />} />
            <Route exact path="/admin/school/edit" element={<SchoolEdit />} />

            <Route exact path="/" element={<StudentLogin />} />
            <Route exact path="/settings/:id" element={<Settings />} />
            <Route exact path="/teacher" element={<TeacherHome />} />
            <Route exact path="/student" element={<StudentHome />} />
            <Route exact path="/students" element={<Students />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
