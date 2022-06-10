import React, { useEffect, useState } from "react";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, withRouter } from "react-router-dom";
import { studentLogin } from "../../../Store/Actions/UserActions";
import { USER_LOGIN_RESET } from "../../../Store/Constants/UserConstants";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userData);

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  const [password, setPassword] = useState("");
  const handleEmail = (e) => {
    console.log(e, "eeeeeeeeee");
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    dispatch(studentLogin(email, password));
  };

  useEffect(() => {
    if (userInfo && userInfo.error) {
      setErrors(userInfo && userInfo.error);
    }
    if (userInfo && userInfo.userInfo && userInfo.userInfo.token) {
      //   dispatch({
      //     type: USER_LOGIN_RESET,
      //   });
      if (
        userInfo &&
        userInfo.userInfo &&
        userInfo.userInfo.user &&
        userInfo.userInfo.user.role == "teacher"
      ) {
        navigate("/teacher");
      } else {
        navigate("/student");
      }
    }
  }, [userInfo]);

  return (
    <>
      <div className="outer">
        <div></div>
        <div className="inner">
          <form>
            <h3>User Login</h3>
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

            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-dark btn-lg btn-block"
            >
              Login
            </button>
            <p className="forgot-password text-right">
              New User <a href="/student/register">Register?</a>
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
