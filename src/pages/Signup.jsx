import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { Button, TextField } from "@mui/material";
import Dropdown from "../components/Dropdown";
import CustomToast from "../components/CustomToast";
import { useRegisterUserMutation } from "../services/userAuthApi";
import "../index.css";

const Signup = ({ client }) => {
  const [organisationChoices, setOrganisationChoices] = useState([]);
  const [organisation, setOrganisation] = useState("Organisation");
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const [formValues, setFormValues] = useState({
    first_name: {
      value: "",
      error: false,
      errorMessage: "You must enter your first name",
    },
    last_name: {
      value: "",
      error: false,
      errorMessage: "You must enter your last name",
    },
    email: {
      value: "",
      error: false,
      errorMessage: "You must enter an email",
    },
    username: {
      value: "",
      error: false,
      errorMessage: "You must enter a username",
    },
    password: {
      value: "",
      error: false,
      errorMessage: "You must enter a password.",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;

      if (currentValue === "") {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
      }
    }

    setFormValues(newFormValues);
    const data = {
      first_name: formValues.first_name.value,
      last_name: formValues.last_name.value,
      email: formValues.email.value,
      organisation: organisation,
      username: formValues.username.value,
      password: formValues.password.value,
    };

    if (
      !data.first_name ||
      !data.last_name ||
      !data.username ||
      !data.email ||
      !data.password ||
      !data.organisation
    ) {
      return;
    }

    const res = await registerUser(data);
    console.log(res);
    if (res.error) {
      setMessage(res.error.data);
      setSeverity("error");
    }

    if (res.data) {
      setMessage("Registered successfully!");
      setSeverity("success");
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    client
      .get("/api/organisations/")
      .then((response) => {
        setOrganisationChoices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching status choices:", error);
      });
  }, []);

  return (
    <div>
      {/* Currently using form, will update it with Formik soon. */}
      <form method="post" noValidate onSubmit={handleSubmit}>
        <div className="auth-form-container">
          <h2 className="auth-header">Sign Up</h2>

          <div>
            <CustomToast message={message} severity={severity} />
          </div>
          <div className="input-container">
            <Stack>
              <TextField
                placeholder="First name"
                label="First Name"
                name="first_name"
                variant="outlined"
                required
                value={formValues.first_name.value}
                onChange={handleChange}
                error={formValues.first_name.error}
                helperText={
                  formValues.first_name.error &&
                  formValues.first_name.errorMessage
                }
                sx={{ marginBottom: "1rem" }}
                type="text"
              />

              <TextField
                placeholder="Last name"
                label="Last Name"
                name="last_name"
                variant="outlined"
                required
                value={formValues.last_name.value}
                onChange={handleChange}
                error={formValues.last_name.error}
                helperText={
                  formValues.last_name.error &&
                  formValues.last_name.errorMessage
                }
                sx={{ marginBottom: "1rem" }}
                type="text"
              />

              <TextField
                placeholder="Enter your email"
                label="Email"
                name="email"
                variant="outlined"
                required
                type="email"
                value={formValues.email.value}
                onChange={handleChange}
                error={formValues.email.error}
                helperText={
                  formValues.email.error && formValues.email.errorMessage
                }
                sx={{ marginBottom: "1rem" }}
              />

              <TextField
                placeholder="Username"
                label="Username"
                name="username"
                variant="outlined"
                required
                value={formValues.username.value}
                type="text"
                onChange={handleChange}
                error={formValues.username.error}
                helperText={
                  formValues.username.error && formValues.username.errorMessage
                }
                sx={{ marginBottom: "1rem" }}
              />

              <div className="dropdown-container">
                <Dropdown
                  organisation={organisation}
                  organisationChoices={organisationChoices}
                  setOrganisation={setOrganisation}
                />
              </div>
              <TextField
                placeholder="Password"
                label="Password"
                name="password"
                variant="outlined"
                required
                value={formValues.password.value}
                type="password"
                onChange={handleChange}
                error={formValues.password.error}
                helperText={
                  formValues.password.error && formValues.password.errorMessage
                }
                sx={{ marginBottom: "1rem" }}
              />
              <Button
                sx={{ marginBottom: "1rem" }}
                type="submit"
                variant="contained"
              >
                Sign Up
              </Button>
              <Link to="/sign-in">Already a user? Log in.</Link>
            </Stack>
          </div>
        </div>
      </form>
      <div className="image-container">
        <img
          className="auth-image"
          src="https://img.freepik.com/free-vector/copywriting-social-media-post-content-marketing-internet-commercial-cartoon-character-writing-text-advertising-promotional-strategy-concept-illustration_335657-2066.jpg?w=1480&t=st=1694697821~exp=1694698421~hmac=bc5db40e957a45a7a83c5b4972778e1acfb6d8b4ee3ae7b34016d017d8778e63"
          alt="Login image"
        />
      </div>
    </div>
  );
};

export default Signup;

