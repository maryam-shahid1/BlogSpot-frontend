import React, { Fragment } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getToken, removeToken } from "../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { PropTypes } from "prop-types";
import { unsetUserToken } from "../features/authSlice";
import { unsetUserInfo } from "../features/userSlice";
import "../index.css";

const Navbar = ({ username }) => {
  const { access_token } = getToken();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const guestLinks = (
    <Fragment>
      <Link className="navbar-link" to="/about">
        About
      </Link>
      <Link className="navbar-link" to="/contact">
        Contact
      </Link>
      <Link className="navbar-link" style={{ fontFamily: "Righteous" }}>
        BlogSpot
      </Link>
      <Link className="navbar-link" to="/sign-in">
        {" "}
        Login{" "}
      </Link>
      <Link className="navbar-link" to="/sign-up">
        Register
      </Link>
    </Fragment>
  );
  const authLinks = (
    <Fragment>
      <Link className="navbar-link" to="/about">
        About
      </Link>
      <Link className="navbar-link" to="/contact">
        Contact
      </Link>
      <Link className="navbar-link" to="/blogspot">
        Home
      </Link>
      <Link className="navbar-link" style={{ fontFamily: "Righteous" }}>
        BlogSpot
      </Link>
      <Link className="navbar-link" to="/create">
        Create
      </Link>
      <div className={`navbar-dropdown ${isOpen ? "open" : ""}`}>
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          {username}
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            <Link
              className="dropdown-item"
              to="/profile"
              onClick={closeDropdown}
            >
              Profile
            </Link>
            <Link
              className="dropdown-item"
              to="/settings"
              onClick={closeDropdown}
            >
              Settings
            </Link>
          </div>
        )}
      </div>
      <Link className="navbar-link" to="/sign-in" onClick={handleLogout}>
        Logout
      </Link>
    </Fragment>
  );

  function handleLogout() {
    dispatch(unsetUserToken({ access_token: null }));
    dispatch(
      unsetUserInfo({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
      })
    );
    removeToken();
  }

  return (
    <div>
      <div className="navbar-outer-div">
        <div className="navbar">{access_token ? authLinks : guestLinks}</div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  username: PropTypes.string,
};

export default Navbar;

