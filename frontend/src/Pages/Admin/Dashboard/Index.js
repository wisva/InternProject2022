import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "../../../Components/Admin/User/List";
import Schedule from "../../../Components/Admin/Schedule/Schedule";
import Reports from "../../../Components/Admin/Reports/Reports";
import School from "../../../Components/Admin/School/List";
import SchoolAdd from "../../../Components/Admin/School/Add";
import SchoolEdit from "../../../Components/Admin/School/Edit";

import Resource from "../../../Components/Admin/Resource/List";
import ResourceAdd from "../../../Components/Admin/Resource/Add";
import ResourceEdit from "../../../Components/Admin/Resource/Edit";
import TeacherRegister from "../../Client/TeacherRegister/Register";
import Sidebar from "../../../Components/Admin/Sidebar/Sidebar";
import Header from "../../../Components/Admin/Header/Header";

function Index() {
  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <Header />
          <Routes>
            <Route path="/school" element={<School />} />
            <Route path="/school/add" element={<SchoolAdd />} />
            <Route path="/school/edit/:id" element={<SchoolEdit />} />

            <Route path="/user" element={<User />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/reports" element={<Reports />} />

            <Route path="/resource" element={<Resource />} />
            <Route path="/resource/add" element={<ResourceAdd />} />
            <Route path="/resource/edit/:id" element={<ResourceEdit />} />

            {/* <Route exact path="/student/login" element={<StudentLogin />} />
        <Route exact path="/student/register" element={<StudentRegister />} />
        <Route exact path="/admin" element={<AdminLogin />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Index;
