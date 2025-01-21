import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/team.css";
import { Col } from "antd";
const RefundPolicy = () => {
  return (
    <Layout title={"Refund Policy - Arrow Publication Pvt ltd"}>
      <div>
        <section className="px-5">
          <div className="container">
            <h1 className="heading text-center">Refund Policy</h1>
          </div>
          <div className="my-5 fs-6">
            <p>
              <strong> Hi !!!</strong>
              <br />
              You may cancel an order any time before it is dispatched.
              Cancellation after the dispatch will not be entertained. To cancel
              an order , you are advised to send an e-mail quoting the Order
              number with the subject "Cancellation" to
              <strong> mail@arrowpublicationsindia.com.</strong>
              <br /> <br />
              If we are not capable to ship your order due to "out of stock"
              condition, then we will refund the total charge of the un-serviced
              product (including shipping charges)
            </p>
            <p>
              {" "}
              The refund will be processed within 5 to 7 Days to your
              source account{" "}
            </p>
          </div>
          <div className="my-5 fs-6">
            <h4 style={{ color: "#d56742" }}>Replacement</h4>
            <p>
              Our shipments are cautiously checked before leaving our premises.
              <br />
              We will offer you the replacement of an order only on following
              cases:
            </p>
            <ul>
              <li style={{ listStyleType: "initial !important" }}>
                Book with missing / blank pages.
              </li>
              <li style={{ listStyleType: "initial !important" }}>
                Incorrectly shipped books.
              </li>
              <li style={{ listStyleType: "initial !important" }}>
                Books damaged in transportation.
              </li>
            </ul>
            <p>
              You must let us know within 15 days of your shipment from the date
              of receipt , if in case of above cases.
            </p>
          </div>
          <div className="my-5 fs-6">
            <h4 className="text-danger">Make A Note</h4>
            <p>
              We will not refund your amount paid for a product in following
              constraints.
            </p>
            <ul>
              <li style={{ listStyleType: "initial !important" }}>
                In case of refusal of recipient in the time of delivery.
              </li>
              <li style={{ listStyleType: "initial !important" }}>
                In case of three unsuccessful delivery attempts by the courier.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default RefundPolicy;
