import Layout from "../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewDealerNetwork = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("");
  const [dealerNetwork, setDealerNetwork] = useState([]);
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState([]);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const stateParam = searchParams.get("state");
    setSelectedState(stateParam);
    fetchDealerNetwork(stateParam);
  }, [location]);

  const fetchDealerNetwork = async (state) => {
    try {
      const response = await fetch(
        `https://api.arrowpublications.in/api/v1/dealer/selected-state/${state}`
      );
      const data = await response.json();
      setDealerNetwork(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dealer network data:", error);
      setLoading(false);
    }
  };
  const handleFilterState = (value) => {
    setSelectedState(value);
  };

  const getAllStates = async () => {
    try {
      const { data } = await axios.get(
        "https://api.arrowpublications.in/api/v1/dealerstate/get-state"
      );
      if (data?.success) {
        setStates(data?.dealerState);
        console.log(data?.dealerState);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };
  useEffect(() => {
    getAllStates();
  }, []);
  const handleFilterSelect = (selectedState) => {
    navigate(`/view-dealer-network?state=${selectedState}`);
  };
  return (
    <>
      <Layout>
        <div className="">
          <div className="executive-search-filter executive-custom-selects">
            <select
              className=" executive-class-filter"
              style={{
                textAlign: "center",
                appearance: "auto",
              }}
              onChange={(e) => handleFilterSelect(e.target.value)}
            >
              <option
                className="option"
                value={selectedState}
                selected={selectedState ? false : true}
              >
                Select State
              </option>
              {states?.map((s) => (
                <option
                  key={s._id}
                  value={s._id}
                  selected={selectedState == s._id ? true : false}
                >
                  {s.state}
                </option>
              ))}
            </select>
          </div>
        </div>
        <h1 className="d-flex justify-content-center mt-4 mb-4">
          Arrow Executives :{" "}
          <span className="fs-3 mt-2 pt-1 ms-2">
            {states.find((s) => s._id === selectedState)?.state}
          </span>
        </h1>
        {loading ? (
          <p className="text-center fs-3 mt-5">Loading...</p>
        ) : dealerNetwork.length === 0 ? (
          <p className="d-flex justify-content-center">
            No dealers found for the selected state.
          </p>
        ) : (
          <ul>
            {/* //   <li key={dealer._id}>
            //     {dealer.dealername} - {dealer.location}
            //   </li> */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 pe-5">
              {dealerNetwork.map((dealer) => (
                <div
                  className="col"
                  // style={{
                  //   maxWidth: "600px",
                  // }}
                  key={dealer._id}
                >
                  <div className="card-dealer ms-2">
                    <img
                      src={`https://api.arrowpublications.in/api/v1/dealer/dealer-photo/${dealer?._id}`}
                      className="card-img-top-product"
                      alt={dealerNetwork.personname}
                      style={{ width: "150px", height: "auto" }}
                    />
                    <div className="card-body" style={{ overflow: "hidden" }}>
                      <div className="ps-3 pe-1">
                        <h5 className="card-title-product">
                          Name : {dealer.dealername}
                        </h5>
                        {/* <h5 className="card-desc">
                          {dealer.personname}
                        </h5> */}
                        {dealer?.state && (
                          <h5 className="card-desc">Email : {dealer.email}</h5>
                        )}
                        {dealer?.phone && (
                          <h5 className="card-desc">
                            Contact : {dealer?.phone}
                          </h5>
                        )}
                        {dealer?.designation && (
                          <h5 className="card-desc">
                            Designation : {dealer?.designation}
                          </h5>
                        )}
                        {dealer?.area && (
                          <h5 className="card-desc">Area : {dealer?.area}</h5>
                        )}
                        {dealer?.state && (
                          <h5 className="card-desc">
                            State : {dealer?.state.state}
                          </h5>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ul>
        )}
      </Layout>
    </>
  );
};

export default ViewDealerNetwork;
