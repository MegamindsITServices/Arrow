import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/Dealernetwork.css";
import axios from "axios";

const DealerNetwork = () => {
  const [dealerNetwork, setDealerNetwork] = useState([]);

  useEffect(() => {
    const getDealers = async () => {
      try {
        const res = await axios.get(
          "https://api.arrowpublications.in/api/v1/dealer/get-all-dealer"
        );
        setDealerNetwork(res.data);
        console.log(res.data);
      } catch (error) {
        console.log("error fetching dealers", error);
      }
    };
    getDealers();
  }, []);

  return (
    <>
      <Layout>
        <div className="ash-color">
          <div className="hero-dealer">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-lg-5">
                  <div className="intro-excerpt-dealer">
                    <h2>
                      Dealer
                      <span className="us ms-1">
                        <b>Network</b>
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h4 className="list-dealers">List of Dealers from Andhra Pradesh:</h4>
          <div className="d-flex justify-content-center">
            <div className="col-md-7">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Dealers Name/Shop Name</th>
                    <th scope="col">Person</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone No</th>
                  </tr>
                </thead>
                <tbody>
                  {dealerNetwork.map((dealer, index) => (
                    <tr key={index}>
                      <td>{dealer.dealername}</td>
                      <td>{dealer.personname}</td>
                      <td>{dealer.address}</td>
                      <td>{dealer.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
      ;
    </>
  );
};

export default DealerNetwork;
