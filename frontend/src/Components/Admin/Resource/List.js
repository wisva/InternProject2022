import React, { useEffect, useState } from "react";
import { useNavigate, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resourceGetAdmin } from "../../../Store/Actions/ResourceActions";
import { Table } from "react-bootstrap";
function List() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [list, setList] = useState("");
  const listData = useSelector((state) => state.resourceAdminList.resource);

  useEffect(() => {
    dispatch(resourceGetAdmin());
  }, [dispatch]);

  const handelEdit = (id) => {
    navigate(`edit/${id}`);
  };
  useEffect(() => {
    if (listData != "") {
      setList(listData);
    }
  }, [listData]);

  console.log(list);
  return (
    <>
      <h5 className="mt-3 mb-3">
        <span className="pb-2  text-success font-weight-bold">
          Resource List
        </span>
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
          Add Resource
        </button>
      </h5>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.data &&
              list.data.map((data) => (
                <tr>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.status}</td>
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
