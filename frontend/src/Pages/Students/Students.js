import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { studentsGet } from "../../Store/Actions/SchoolActions";
function Students() {
  const dispatch = useDispatch();
  const [type, setType] = useState("all");

  const userInfo = useSelector((state) => state.userData.userInfo);

  const handleClass = (e) => {
    dispatch(
      studentsGet(
        userInfo && userInfo.user && userInfo.user.school,
        e.target.value
      )
    );
  };
  useEffect(() => {
    dispatch(
      studentsGet(userInfo && userInfo.user && userInfo.user.school, "all")
    );
  }, []);

  return (
    <select
      class="form-select form-select-sm mb-3"
      aria-label=".form-select-sm example"
      onChange={(e) => handleClass(e)}
    >
      <option value="" disabled selected hidden>
        Class
      </option>
      <option value="all">All Years</option>
      <option value="1">First Year</option>
      <option value="2">Second Year</option>
      <option value="3">Third Year</option>
      <option value="4">Fourth Year </option>
    </select>
  );
}

export default Students;
