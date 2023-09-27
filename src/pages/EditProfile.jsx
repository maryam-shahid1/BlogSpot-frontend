import * as React from "react";
import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getToken } from "../services/LocalStorageService";
import { Formik } from "formik";
import { useUpdateUserMutation } from "../services/userAuthApi";
import "../index.css";
import Layout from "../components/Layout";
import CustomToast from "../components/CustomToast";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const { access_token } = getToken();
  const [updateUser] = useUpdateUserMutation();
  const [message, setMessage] = useState("");

  return (
    <div>
      <Layout>
        <CustomToast message={message} severity={"success"}></CustomToast>
        <div className="outer-div">
          <div className="inner-div">
            <h1>Edit Profile</h1>
            <div>
              <Formik
                initialValues={{
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                  username: user.username,
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  const data = {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    username: values.username,
                  };
                  const res = await updateUser({ access_token, data });
                  setSubmitting(false);
                  setMessage("Updated successfully.");
                }}
              >
                {({ values, handleChange, handleSubmit, isSubmitting }) => (
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <TextField
                      placeholder="Enter your email"
                      label="Email"
                      name="email"
                      variant="outlined"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      sx={{
                        marginBottom: "2rem",
                        width: "380px",
                        marginTop: "40px",
                      }}
                    />

                    <TextField
                      placeholder="Username"
                      label="Username"
                      name="username"
                      variant="outlined"
                      value={values.username}
                      type="text"
                      onChange={handleChange}
                      sx={{ marginBottom: "2rem", width: "380px" }}
                    />

                    <TextField
                      placeholder="First name"
                      label="First Name"
                      name="first_name"
                      variant="outlined"
                      value={values.first_name}
                      onChange={handleChange}
                      sx={{ marginBottom: "2rem", width: "380px" }}
                      type="text"
                    />
                    <TextField
                      placeholder="Last name"
                      label="Last Name"
                      name="last_name"
                      variant="outlined"
                      value={values.last_name}
                      onChange={handleChange}
                      sx={{ marginBottom: "2rem", width: "380px" }}
                      type="text"
                    />
                    <div>
                      <Button
                        disabled={isSubmitting}
                        sx={{ marginBottom: "1rem", backgroundColor: "black" }}
                        type="submit"
                        variant="contained"
                      >
                        Update
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default EditProfile;

