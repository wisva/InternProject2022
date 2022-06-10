import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generateReport } from "../../../Store/Actions/ResourceActions";
import { resourceGetAdmin } from "../../../Store/Actions/ResourceActions";
import { getUsers } from "../../../Store/Actions/AdminActions";

function Reports() {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [list, setList] = useState("");
  const [teacher, setTeacher] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [showTeacher, setShowTeacher] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showResource, setShowResource] = useState(false);
  const reportData = useSelector((state) => state.reportGet.resource);
  const listData = useSelector((state) => state.resourceAdminList.resource);
  const userList = useSelector((state) => state.adminUsers.adminInfo);

  const handleClass = (e) => {
    setType(e.target.value);
  };
  const handleResource = (e) => {
    dispatch(generateReport(type, e.target.value));
  };
  const handleGenerate = (e) => {
    dispatch(generateReport(start, end));
  };

  const handleTeacher = (e) => {
    dispatch(generateReport(type, e.target.value));
  };
  const handleStart = (e) => {
    setStart(e.target.value);
  };
  const handleEnd = (e) => {
    setEnd(e.target.value);
  };
  useEffect(() => {
    if (type && type == "1") {
      dispatch(generateReport(type, "all"));
    } else if (type && type == "2") {
      setShowTeacher(true);
      setShowDate(false);
      setShowResource(false);
    } else if (type && type == "4") {
      setShowDate(true);
      setShowTeacher(false);
      setShowResource(false);
    } else if (type && type == "3") {
      setShowResource(true);
      setShowTeacher(false);
      setShowDate(false);
    }
  }, [type]);

  useEffect(() => {
    if (reportData && reportData.data) {
      window.open(`http://127.0.0.1:8000/export.csv`);
    }
  }, [reportData]);

  useEffect(() => {
    dispatch(resourceGetAdmin());
    dispatch(getUsers("teacher"));
  }, [dispatch]);
  useEffect(() => {
    if (listData != "") {
      setList(listData);
    }
  }, [listData]);

  useEffect(() => {
    if (listData != "") {
      setList(listData);
    }
  }, [listData]);

  useEffect(() => {
    setTeacher(userList);
  }, [userList]);

  console.log(teacher, "teacher");
  return (
    <>
      <div className="p-4">
        <div>Reports</div>
        <select
          class="form-select form-select-sm mb-3"
          aria-label=".form-select-sm example"
          onChange={(e) => handleClass(e)}
        >
          <option value="" disabled selected hidden>
            Type
          </option>
          <option value="1">All</option>
          <option value="2">By Teacher</option>

          <option value="3">By Resource</option>
          <option value="4">By Date</option>
        </select>
        {showTeacher && showTeacher && (
          <div>
            <select
              class="form-select form-select-sm mb-3"
              aria-label=".form-select-sm example"
              onChange={(e) => handleTeacher(e)}
            >
              <option value="" disabled selected hidden>
                Select Teacher
              </option>
              {teacher &&
                teacher.data &&
                teacher.data.map((data) => (
                  <option value={data.id}>{data.name}</option>
                ))}
            </select>
          </div>
        )}

        {showDate && showDate && (
          <div>
            <label for="birthdaytime">Start Date :</label>
            <input
              type="datetime-local"
              id="birthdaytime"
              name="birthdaytime"
              onChange={handleStart}
            ></input>
            <label for="birthdaytime">End Date :</label>
            <input
              type="datetime-local"
              id="birthdaytime"
              name="birthdaytime"
              onChange={handleEnd}
            ></input>
            <button className="btn btn-success" onClick={handleGenerate}>
              Generate
            </button>
          </div>
        )}

        {showResource && showResource && (
          <div>
            <select
              class="form-select form-select-sm mb-3"
              aria-label=".form-select-sm example"
              onChange={(e) => handleResource(e)}
            >
              <option value="" disabled selected hidden>
                Select Resource
              </option>
              {list &&
                list.data &&
                list.data.map((data) => (
                  <option value={data.id}>{data.name}</option>
                ))}
            </select>
          </div>
        )}
      </div>
    </>
  );
}

export default Reports;
