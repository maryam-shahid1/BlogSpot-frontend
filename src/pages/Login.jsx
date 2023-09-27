import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import CustomToast from "../components/CustomToast";
import PropTypes from "prop-types";
import "../index.css";
import { propTypes } from "react-bootstrap/esm/Image";
import { storeToken, getToken } from "../services/LocalStorageService";
import { useLoginUserMutation } from "../services/userAuthApi";
import { useDispatch } from "react-redux";
import { setUserToken } from "../features/authSlice";

const Login = ({ client }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    const res = await loginUser(data);

    if (res.error) {
      setMessage(res.error.data.detail);
      setSeverity("error");
    }

    storeToken(res.data);

    const { access_token } = getToken();
    dispatch(setUserToken({ access_token: access_token }));
  };

  const { access_token } = getToken();
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);

  return (
    <div>
      <div>
        <form onSubmit={onSubmit} method="post">
          <div className="auth-form-container">
            <div className="auth-header">
              <h2>Log In</h2>
              <div>
                <CustomToast message={message} severity={severity} />
              </div>
            </div>
            <div className="input-container">
              <TextField
                id="outlined-basic"
                required={true}
                label="Email"
                variant="outlined"
                sx={{ marginBottom: "30px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <TextField
                id="outlined-basic"
                required={true}
                label="Password"
                variant="outlined"
                sx={{ marginBottom: "30px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <Button
                sx={{ marginBottom: "30px" }}
                type="submit"
                variant="contained"
              >
                Log In
              </Button>
              <Link to={"/sign-up"}>Create an account.</Link>
            </div>
          </div>
        </form>
      </div>
      <div className="image-container">
        <h1 className="blogspot-heading">BlogSpot</h1>
        <img
          className="auth-image"
          src="https://img.freepik.com/free-vector/hand-drawn-essay-illustration_23-2150268421.jpg?w=1480&t=st=1694963234~exp=1694963834~hmac=6b6e7f04fda78875e052545b3a6a4cd61b1e9929a31adaf6203e817b6ef85e48"
          alt="Login image"
        />
      </div>
    </div>
  );
};

export default Login;

