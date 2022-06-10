import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Scheduler } from "@aldabil/react-scheduler";
import { scheduleGet } from "../../../Store/Actions/ResourceActions";
function Schedule() {
  const dispatch = useDispatch();

  const [schedule, setSchedule] = useState("");
  const scheduleData = useSelector((state) => state.scheduleGet.resource);

  useEffect(() => {
    dispatch(scheduleGet("admin"));
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
    console.log(event, "event");

    let id = Math.random();
    if (action === "edit") {
    } else if (action === "create") {
      //   let data = {};
      //   data.event_id = id;
      //   data.teacher_id = userInfo && userInfo.user && userInfo.user.id;
      //   data.email = userInfo && userInfo.user && userInfo.user.email;
      //   data.name = userInfo && userInfo.user && userInfo.user.name;
      //   data.title = event.title;
      //   data.system = event.system;
      //   data.start = dateConvert(event && event.start);
      //   data.end = dateConvert(event && event.end);
      //   data.students = event && event.students;
      //   console.log(data, "data");
      //   dispatch(resourceRequest(data));
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
  };
  return (
    <div>
      <Scheduler
        view="month"
        events={schedule && schedule.length > 0 ? schedule : []}
        onConfirm={(e, action) => handleConfirm(e, action)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Schedule;
