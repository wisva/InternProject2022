import React, { useEffect, useState } from "react";
import { useNavigate, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  approveUser,
  deleteUser,
} from "../../../Store/Actions/AdminActions";
import { Table } from "react-bootstrap";

function List() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [type, setType] = useState("all");
  const [users, setUsers] = useState("all");
  const userList = useSelector((state) => state.adminUsers.adminInfo);
  const adminApprove = useSelector((state) => state.adminApprove.adminInfo);

  const handleSelect = (e) => {
    setType(e.target.value);
  };

  const handlePending = (id) => {
    dispatch(approveUser(id));
  };
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };
  useEffect(() => {
    dispatch(getUsers(type));
  }, [type]);

  useEffect(() => {
    setUsers(userList);
  }, [userList]);

  useEffect(() => {
    if (adminApprove && adminApprove.data) {
      window.location.reload();
    }
  }, [adminApprove]);

  return (
    <>
      <div className="p-3">
        <h5 className="mt-3 mb-3">
          <span className="pb-2  text-success font-weight-bold">
            User List
          </span>
          {/* <input type="text" id='filter-text-box' placeholder="Filter..." onInput={(e) => onFilterTextBoxChanged(e)} /> */}
        </h5>
        <div>
          <select
            class="form-select form-select-sm mb-3"
            aria-label=".form-select-sm example"
            onChange={(e) => handleSelect(e)}
          >
            <option value="" disabled selected hidden>
              Select type
            </option>
            <option value="all">All user</option>
            <option value="teacher">All teachers</option>
            <option value="student">All students</option>
            <option value="pending">Pending Users</option>
            <option value="active">Active users</option>
          </select>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.data &&
                users.data.map((data, index) => (
                  <tr>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.role}</td>
                    <td>{data.status}</td>
                    <td>
                      {data.status == "0" ? (
                        <button onClick={() => handlePending(data.id)}>
                          Approve
                        </button>
                      ) : (
                        <button>Approved</button>
                      )}
                      <button
                        className="ml-3"
                        onClick={() => handleDelete(data.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default List;
