import React, { useState } from "react";
import { resourceAdd } from "../../../Store/Actions/ResourceActions";
import { useSelector, useDispatch } from "react-redux";

function Add() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleCancelClick = () => {
    dispatch(resourceAdd(name));
  };
  return (
    <>
      <div className="row">
        <div className="col-md-2">
          <div class="form-group float-right">
            <label for="exampleInputEmail1" className="adminlable">
              System Name
            </label>
          </div>
        </div>
        <div className="col-md-10">
          <input
            type="text"
            class="form-control"
            name="template_id"
            value={name}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button
          type="button"
          onClick={(e) => handleCancelClick(e)}
          className="btn btn-success"
        >
          Save
        </button>
        <button className="btn btn-danger ml-3">Cancel</button>
      </div>
    </>
  );
}

export default Add;
