import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "../index.css";

const About = () => {
  return (
    <div>
      <Layout>
        <div className="outer-div">
          <div className="inner-div">
            <h1>About</h1>
            <p>We are a small passionate team.</p>
            <div className="about-outer-div">
              <div className="about-images-div">
                <img className="about-image" src="boy.avif"></img>
              </div>
              <div className="about-img-container">
                <img className="about-image" src="girl.jpeg"></img>
              </div>
              <div className="about-img-container">
                <img className="about-image" src="man.jpeg"></img>
              </div>
            </div>
            <div className="about-detail">
              <p className="about-p">
                We provide real-time connectivity to enable software providers
                and financial institutions to build integrated products for
                their small business customers.
              </p>
              <p className="about-p">
                Our API infrastructure is leveraged by clients ranging from
                lenders to corporate card providers and business forecasting
                tools, with use cases including automatic reconciliation,
                business dashboarding, and loan decisioning.
              </p>
              <p>
                <Link to="/contact">Get in touch &rarr;</Link>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default About;

