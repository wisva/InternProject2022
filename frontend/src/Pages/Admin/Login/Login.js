import React, { useEffect, useState } from "react";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, withRouter } from "react-router-dom";
import { adminLogin } from "../../../Store/Actions/AdminActions";
import { ADMIN_LOGOUT_RESET } from "../../../Store/Constants/AdminConstants";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [password, setPassword] = useState("");
  const { error, adminInfo } = useSelector((state) => state.adminData);
  const adminData = useSelector((state) => state.adminData);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    dispatch(adminLogin(email, password));
  };

  useEffect(() => {
    if (error && error) {
      setErrors(error);
    }
    if (adminInfo && Object.keys(adminInfo).length > 0) {
      dispatch({
        type: ADMIN_LOGOUT_RESET,
      });
      navigate("/admin/dashboard");
    }
  }, [adminInfo, error]);
  console.log(errors, "err");
  return (
    <>
      <div className="outer">
        <div></div>
        <div className="inner">
          <form>
            <h3>Admin</h3>
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
            {/* <p className="forgot-password text-right">
              Already registered <a href="#">log in?</a>
            </p> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
