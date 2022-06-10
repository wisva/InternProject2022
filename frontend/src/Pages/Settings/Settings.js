import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { userParticularGet, userUpdate } from "../../Store/Actions/UserActions";
import Navbar from "../../Components/Client/Navbar/Navbar";
import { schoolGet } from "../../Store/Actions/SchoolActions";

function Settings() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [school, setSchool] = useState("");
  const [user, setUser] = useState("");
  const [errors, setErrors] = useState("");
  const [schoolData, setSchoolData] = useState("");
  const userInfo = useSelector((state) => state.userData.userInfo);
  const schoolList = useSelector((state) => state.schoolList.school);
  const userParticular = useSelector((state) => state.userParticular.user);
  useEffect(() => {
    dispatch(userParticularGet(id));
  }, [id]);

  const handleChange = (e) => {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (user && user.new_password && user.new_password != "") {
      if ((user && user.new_password) == (user && user.confirm_password)) {
        dispatch(userUpdate(user, id));
      } else {
        console.log(user && user.new_password, user && user.confirm_password);
        alert("New password and confirm password Dont match");
      }
    } else {
      dispatch(userUpdate(user, id));
    }
  };
  useEffect(() => {
    setSchoolData(schoolList && schoolList.data);
  }, [schoolList]);
  useEffect(() => {
    setUser(userParticular && userParticular.data);
  }, [userParticular]);
  useEffect(() => {
    dispatch(schoolGet());
  }, []);
  console.log(user, "user");
  return (
    <>
      <Navbar
        role={userInfo && userInfo.user && userInfo.user.role}
        id={userInfo && userInfo.user && userInfo.user.id}
      />
      <div className="container light-style flex-grow-1 container-p-y">
        <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>

        <div className="card overflow-hidden">
          <div className="row no-gutters row-bordered row-border-light">
            <div className="col-md-9">
              <div className="tab-content pl-4">
                <div className="tab-pane fade active show" id="account-general">
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={user && user.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">E-mail</label>
                      <input
                        type="text"
                        className="form-control mb-1"
                        value={user && user.email}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Current password</label>
                      <input
                        type="password"
                        name="current_password"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">New password</label>
                      <input
                        type="password"
                        name="new_password"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Confirm password</label>
                      <input
                        type="password"
                        name="confirm_password"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">School</label>
                      <select
                        class="form-select form-select-sm mb-3"
                        aria-label=".form-select-sm example"
                        name="school"
                        value={user && user.school}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected hidden>
                          School
                        </option>
                        {schoolData &&
                          schoolData.map((data) => (
                            <option value={data.id}>{data.name}</option>
                          ))}
                      </select>
                    </div>
                    {userInfo &&
                      userInfo.user &&
                      userInfo.user.role &&
                      userInfo &&
                      userInfo.user &&
                      userInfo.user.role == "student" && (
                        <div className="form-group">
                          <label className="form-label">Class</label>
                          <select
                            name="class"
                            class="form-select form-select-sm mb-3"
                            aria-label=".form-select-sm example"
                            value={user && user.class}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected hidden>
                              Class
                            </option>
                            <option value="1">First Year</option>
                            <option value="2">Second Year</option>
                            <option value="3">Third Year</option>
                            <option value="4">Fourth Year </option>
                          </select>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right mt-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Save changes
          </button>
          &nbsp;
          <button type="button" className="btn btn-default">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default Settings;
