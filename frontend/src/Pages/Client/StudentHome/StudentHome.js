import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../../Components/Client/Navbar/Navbar";
import { Button, Nav, NavDropdown, Container, Card } from "react-bootstrap";
import { Scheduler } from "@aldabil/react-scheduler";
import Multiselect from "multiselect-react-dropdown";
import {
  resourceGetClient,
  resourceRequest,
  scheduleGet,
} from "../../../Store/Actions/ResourceActions";
import { studentsGet } from "../../../Store/Actions/SchoolActions";

function TeacherHome() {
  const dispatch = useDispatch();

  const [schedule, setSchedule] = useState("");

  const userInfo = useSelector((state) => state.userData.userInfo);

  const scheduleData = useSelector((state) => state.scheduleGet.resource);

  useEffect(() => {
    dispatch(scheduleGet(userInfo && userInfo.user && userInfo.user.id));
  }, []);

  useEffect(() => {
    let convertedArray = [];
    scheduleData &&
      scheduleData.data &&
      scheduleData.data.map((res, index) => {
        let data = res;
        data.start = new Date(res.start);
        data.end = new Date(res.end);
        convertedArray.push(data);
      });
    setSchedule(convertedArray);
  }, [scheduleData]);

  const handleConfirm = (event, action, name) => {
    console.log(event, "sgsfr");
  };
  const handleDelete = (deletedId) => {
    console.log(deletedId, "sgsfr");
  };

  console.log(schedule, "schedule");
  return (
    <>
      <Navbar
        role={"student"}
        id={userInfo && userInfo.user && userInfo.user.id}
      />

      <div className="container">
        <h4>Hi {userInfo && userInfo.user && userInfo.user.name}</h4>

        <Scheduler
          view="month"
          events={schedule && schedule.length > 0 ? schedule : []}
        />
      </div>
    </>
  );
}

export default TeacherHome;
