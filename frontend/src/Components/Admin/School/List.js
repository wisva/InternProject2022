import React, { useEffect, useState } from "react";
import { useNavigate, withRouter } from "react-router-dom";
import { schoolGet } from "../../../Store/Actions/SchoolActions";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";

function List() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState("");
  const schoolList = useSelector((state) => state.schoolList.school);

  useEffect(() => {
    dispatch(schoolGet("admin"));
  }, []);
  const handelEdit = (id) => {
    navigate(`edit/${id}`);
  };
  useEffect(() => {
    setSchoolData(schoolList && schoolList.data);
  }, [schoolList]);
  console.log(typeof errors, "error");
  return (
    <>
      <h5 className="mt-3 mb-3">
        <span className="pb-2  text-success font-weight-bold">School List</span>
        {/* <input type="text" id='filter-text-box' placeholder="Filter..." onInput={(e) => onFilterTextBoxChanged(e)} /> */}
        <button
          className="btn btn-success btn-sm float-right mt-0"
          onClick={(event) => {
            navigate(`add`);
          }}
        >
          <i
            class="fa fa-plus"
            aria-hidden="true"
            style={{ color: "white" }}
          ></i>{" "}
          Add Schools
        </button>
      </h5>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {schoolData &&
              schoolData.map((data) => (
                <tr>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td onClick={() => handelEdit(data.id)}>Edit</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default List;
