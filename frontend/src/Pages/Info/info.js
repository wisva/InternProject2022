import React from "react";
import "./info.css";
import { useNavigate, withRouter } from "react-router-dom";

function Info() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <>
      <div className="info_div">
        <div className="content_div">
          <h4>Your request is in process!</h4>
          <h5>Please be patient...</h5>
          <button className="btn btn-success" onClick={handleGoBack}>
            Go back
          </button>
        </div>
      </div>
    </>
  );
}

export default Info;
