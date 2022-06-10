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
  resourceEdit,
  scheduleEdit,
  scheduleDelete,
} from "../../../Store/Actions/ResourceActions";
import { studentsGet } from "../../../Store/Actions/SchoolActions";

function TeacherHome() {
  const dispatch = useDispatch();
  const [resource, setResource] = useState("");
  const [schedule, setSchedule] = useState("");
  const [system, setSystem] = useState("");
  const [selectedValue, setSelectedValue] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const userInfo = useSelector((state) => state.userData.userInfo);
  const resourceData = useSelector((state) => state.resourceGet.resource);
  const resourceRequestData = useSelector(
    (state) => state.resourceRequest.resource
  );
  const scheduleData = useSelector((state) => state.scheduleGet.resource);
  const studentsData = useSelector((state) => state.studentsGet.school);
  useEffect(() => {
    dispatch(resourceGetClient());
    dispatch(scheduleGet(userInfo && userInfo.user && userInfo.user.id));
    dispatch(
      studentsGet(userInfo && userInfo.user && userInfo.user.school, "all")
    );
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

  useEffect(() => {
    setResource(resourceData && resourceData.data);
  }, [resourceData]);

  useEffect(() => {
    let studentArray = [];
    studentsData &&
      studentsData.data &&
      studentsData.data.map(
        (res, index) =>
          studentArray.push({ id: res.id, text: res.name, value: res.id })
        //   studentArray.push({ cat: res.id, key: res.name })
      );
    setStudentsList(studentArray);
  }, [studentsData]);

  useEffect(() => {
    let systemArray = [];

    resource &&
      resource.map((res, index) =>
        systemArray.push({ id: res.id, text: res.name, value: res.id })
      );
    setSystem(systemArray);
  }, [resource]);

  const dateConvert = (date) => {
    const start = new Date(date);
    const offsetMs = start.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(start.getTime() - offsetMs);
    const str = dateLocal
      .toISOString()
      .slice(0, 19)
      .replace(/-/g, "/")
      .replace("T", " ");

    return str;
  };

  console.log(studentsData, "studentsData");

  const handleConfirm = (event, action, name) => {
    console.log(event, "event");

    let id = Math.floor(Math.random() * 1000000);
    if (action === "edit") {
      let data = {};
      data.event_id = event.event_id;
      data.teacher_id = userInfo && userInfo.user && userInfo.user.id;
      data.email = userInfo && userInfo.user && userInfo.user.email;
      data.name = userInfo && userInfo.user && userInfo.user.name;
      data.title = event.title;
      data.system = event.system;
      data.start = dateConvert(event && event.start);
      data.end = dateConvert(event && event.end);
      data.students = event && event.students;
      console.log(data, "data");
      dispatch(scheduleEdit(event.event_id, data));
    } else if (action === "create") {
      //   selectedValue &&
      //     selectedValue.map((data, index) => {
      //       console.log(data, "data");
      //       stuArray.push(data.cat);
      //     });
      let data = {};
      data.event_id = id;
      data.teacher_id = userInfo && userInfo.user && userInfo.user.id;
      data.email = userInfo && userInfo.user && userInfo.user.email;
      data.name = userInfo && userInfo.user && userInfo.user.name;
      data.title = event.title;
      data.system = event.system;
      data.start = dateConvert(event && event.start);
      data.end = dateConvert(event && event.end);
      data.students = event && event.students;
      console.log(data, "data");
      dispatch(resourceRequest(data));
    }
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({
          ...event,
          event_id: event.event_id || id,
        });
      }, 1000);
    });
  };
  const handleDelete = (deletedId) => {
    console.log(deletedId, "sgsfr");
    dispatch(scheduleDelete(deletedId));
  };

  useEffect(() => {
    if (resourceRequestData && resourceRequestData.error) {
      alert(resourceRequestData && resourceRequestData.message);
      window.location.reload();
    }
  }, [resourceRequestData]);

  return (
    <>
      <Navbar
        role={"teacher"}
        id={userInfo && userInfo.user && userInfo.user.id}
      />

      <div className="container">
        {/* <Multiselect
          selectedValues={selectedValue && selectedValue}
          displayValue="key"
          //   onKeyPressFn={function noRefCheck() {}}
          onRemove={(e) => handleRemove(e)}
          //   onSearch={function noRefCheck() {}}
          onSelect={(e) => handleSelect(e)}
          options={studentsList && studentsList}
        /> */}

        <h4>Welcome {userInfo && userInfo.user && userInfo.user.name} !</h4>

        <Scheduler
          view="month"
          fields={[
            {
              name: "system",
              type: "select",
              // Should provide options with type:"select"
              options: system && system,
              config: {
                label: "System",
                required: true,
                errMsg: "Please Select System",
              },
            },
            {
              name: "students",
              type: "select",
              // Should provide options with type:"select"
              options: studentsList && studentsList,
              config: {
                label: "Students",
                required: true,
                multiple: true,
                errMsg: "Please Select Students",
              },
            },
          ]}
          resourceFields={studentsList}
          events={schedule && schedule.length > 0 ? schedule : []}
          onConfirm={(e, action) => handleConfirm(e, action)}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default TeacherHome;
