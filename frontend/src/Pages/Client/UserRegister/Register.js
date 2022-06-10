import React, { useEffect, useState } from "react";
import "./Register.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, withRouter } from "react-router-dom";
import { studentRegister } from "../../../Store/Actions/UserActions";
import { schoolGet } from "../../../Store/Actions/SchoolActions";
import { USER_REGISTER_RESET } from "../../../Store/Constants/UserConstants";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [school, setSchool] = useState("");
  const [classes, setClasses] = useState("");
  const [schoolData, setSchoolData] = useState("");

  const userInfo = useSelector((state) => state.userRegister);
  const schoolList = useSelector((state) => state.schoolList.school);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSchool = (e) => {
    setSchool(e.target.value);
  };
  const handleClass = (e) => {
    setClasses(e.target.value);
  };
  const handleSubmit = () => {
    dispatch(
      studentRegister(name, email, password, "student", school, classes)
    );
  };

  useEffect(() => {
    if (userInfo && userInfo.error) {
      setErrors(userInfo && userInfo.error);
    }
    if (userInfo && userInfo.userInfo && userInfo.userInfo.token) {
      dispatch({
        type: USER_REGISTER_RESET,
      });
      navigate("/info");
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(schoolGet());
  }, []);

  useEffect(() => {
    setSchoolData(schoolList && schoolList.data);
  }, [schoolList]);

  return (
    <>
      <div className="outer">
        <div></div>
        <div className="inner">
          <form>
            <h3>User Register</h3>
            {errors && errors != "" && typeof errors === "string" ? (
              <p className="error-message">{errors}</p>
            ) : (
              errors &&
              errors != "" &&
              Object.keys(errors && errors).map((key) => (
                <p className="error-message">{errors[key][0]}</p>
              ))
            )}
            <div className="form-group">
              <label>Name</label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={handleName}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={handleEmail}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={handlePassword}
              />
            </div>
            <select
              class="form-select form-select-sm mb-3"
              aria-label=".form-select-sm example"
              onChange={(e) => handleSchool(e)}
            >
              <option value="" disabled selected hidden>
                School
              </option>
              {schoolData &&
                schoolData.map((data) => (
                  <option value={data.id}>{data.name}</option>
                ))}
            </select>
            <select
              class="form-select form-select-sm mb-3"
              aria-label=".form-select-sm example"
              onChange={(e) => handleClass(e)}
            >
              <option value="" disabled selected hidden>
                Class
              </option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Fourth Year </option>
            </select>

            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-dark btn-lg btn-block"
            >
              Register
            </button>
            <p className="forgot-password text-right">
              Already registered <a href="/student/login">log in?</a>
            </p>
            <p className="forgot-password text-right">
              or <a href="/teacher/login">Teacher?</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
