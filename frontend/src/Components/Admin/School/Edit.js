import React, { useState, useEffect } from "react";
import {
  schoolParticularGet,
  schoolEdit,
} from "../../../Store/Actions/SchoolActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function Add() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const particularData = useSelector((state) => state.schoolParticular.school);
  const { id } = useParams();
  console.log(id, "id");
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleCancelClick = () => {
    dispatch(schoolEdit(id, name));
  };

  useEffect(() => {
    dispatch(schoolParticularGet(id));
  }, []);

  useEffect(() => {
    setName(particularData && particularData.data && particularData.data.name);
  }, [particularData]);

  return (
    <>
      <div className="row">
        <div className="col-md-2">
          <div class="form-group float-right">
            <label for="exampleInputEmail1" className="adminlable">
              School Name
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
