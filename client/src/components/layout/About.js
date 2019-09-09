import React, { Fragment } from "react";

const About = () => {
  return (
    <Fragment>
      <div className="container-fluid mt-5 d-flex flex-row justify-content-center">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://media.giphy.com/media/xT5LMPbo3H3BLIdL8s/giphy.gif"
            className="card-img-top"
            alt="Its me"
          />
          <div className="card-body text-center">
            <p className="card-text">
              &copy; Gifaway, 2019. <br /> Made with{" "}
              <i className="fas fa-heart"></i> by John Wilson.
            </p>
            <div className="container text-center">
              <i className="far fa-hand-spock"></i>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
