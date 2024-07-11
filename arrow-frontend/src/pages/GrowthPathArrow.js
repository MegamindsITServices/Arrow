import React from "react";
import Layout from "./../components/Layout/Layout";
import GrowthImage from "../images/new-growth-path-img.jpg";
import "../styles/growpath.css";

const GrowthPathArrow = () => {
  return (
    <>
      <Layout title={"Read And Grow - Arrow Publication Pvt ltd"}>
        <div className="hero-6">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5">
                <div className="intro-excerpt-growpath">
                  <h1>
                    Growth
                    <span className="path ms-1">
                      <b>Path</b>
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <img src={GrowthImage} alt="grwthimage" className="growimage" />
        </div>

        {/* <div>
          <div className="subscribe">
            <h5 className="about-arrow">
              Want to know more about Arrow Publications?
              <div className="form-floating ms-2">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <button className="ms-3 button">Submit</button>
            </h5>
          </div>
        </div> */}
      </Layout>
    </>
  );
};

export default GrowthPathArrow;
