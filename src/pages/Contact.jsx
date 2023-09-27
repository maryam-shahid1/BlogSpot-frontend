import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { Formik } from "formik";
import { TextField, Button } from "@mui/material";
import Layout from "../components/Layout";
import "../index.css";

const Contact = () => {
  return (
    <div>
      <Layout>
        <div className="outer-div">
          <div className="inner-div">
            <h1>Contact</h1>
            <p className="sub-text">We are here to help.</p>
            <div className="left-div">
              <div className="contact-details">
                <h2>Contact BlogSpot</h2>
                <p className="contact-text">
                  Have something to say? We are here to help. Fill up the form
                  or send email or call phone.
                </p>
                <div className="contact-sub-div">
                  <LocationOnOutlinedIcon
                    sx={{
                      height: "16px",
                      lineHeight: "24px",
                      marginRight: "10px",
                    }}
                  />
                  <span className="contact-line">
                    1734 Sanfransico, CA 93063
                  </span>
                </div>
                <div className="contact-sub-div">
                  <EmailOutlinedIcon
                    sx={{
                      height: "16px",
                      lineHeight: "24px",
                      marginRight: "10px",
                    }}
                  />
                  <a
                    href="mailto:hello@stablotemplate.com"
                    className="contact-line"
                  >
                    admin@blogspot.com
                  </a>
                </div>
                <div className="contact-sub-div">
                  <LocalPhoneOutlinedIcon
                    sx={{ height: "16px", marginRight: "10px" }}
                  />
                  <a href="tel:+1 (987) 4587 899" className="contact-line">
                    +1 (987) 4587 899
                  </a>
                </div>
              </div>
              <div className="right-div">
                <Formik
                  initialValues={{ subject: "", email: "", message: "" }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = "Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address";
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit} className="contact-form">
                      <TextField
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.subject}
                        sx={{ marginTop: "40px", mb: "20px" }}
                      />
                      {errors.email && touched.email && errors.email}
                      <TextField
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      {errors.email && touched.email && errors.email}
                      <TextField
                        type="text"
                        name="message"
                        placeholder="Message..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.message}
                        multiline
                        rows={5}
                        sx={{ marginTop: "20px", mb: "20px" }}
                      />
                      {errors.password && touched.password && errors.password}
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "black" }}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Submit
                      </Button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Contact;

