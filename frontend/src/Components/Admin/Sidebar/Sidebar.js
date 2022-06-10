import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useMatch } from "react-router-dom";

function Sidebar() {
  const [isActive, setActive] = useState(false);

  return (
    <>
      <ul
        className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
          isActive && "toggled"
        }`}
        id="accordionSidebar"
      >
        <a className="sidebar-brand d-flex align-items-center justify-content-center bg-white">
          <button
            // onClick={""}
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
          <div className="sidebar-brand-text mx-1" style={{ color: "green" }}>
            {/* <img src="/images/logo.svg" alt="logo" /> */}
            <h4>ADMIN DASHBOARD</h4>
          </div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item">
          <NavLink to={`/stats`}>
            <a className="nav-link">
              <i className="fa  fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </NavLink>
        </li>

        <hr className="sidebar-divider" />

        <li className="nav-item">
          <NavLink className="nav-link collapsed" to={`user`}>
            <i className="fa  fa-user-circle"></i>
            <span>Users</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link collapsed" to={`schedule`}>
            <i className="fa  fa-user-circle"></i>
            <span>Bookings Calendar</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link collapsed" to={`school`}>
            <i className="fa  fa-user-circle"></i>
            <span>School</span>
          </NavLink>
        </li>

        {/* <li className="nav-item">
					<a className="nav-link collapsed">
						<i className="fa  fa-envelope"></i>
						<span>Subscription Plan</span>
					</a>
				</li> */}

        <li className="nav-item">
          <NavLink className="nav-link collapsed" to={`resource`}>
            <i className="fa  fa-file"></i>
            <span>Resource</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link collapsed" to={`reports`}>
            <i className="fa fa-credit-card-alt"></i>
            <span>Reports</span>
          </NavLink>
        </li>

        {/* <li className="nav-item">
          <a className="nav-link collapsed">
            <i className="fa  fa-comments"></i>
            <span>Chat</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed">
            <i className="fa fa-headphones"></i>
            <span>Support & Help desk</span>
          </a>
        </li>

        <li className="nav-item">
          <NavLink to={`/settings`}>
            <a className="nav-link">
              <i className="fa  fa-wrench"></i>
              <span>Settings</span>
            </a>
          </NavLink>
        </li> */}

        {/* <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button onClick={toggleClass}
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div> */}
      </ul>
    </>
  );
}

export default Sidebar;
