import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { SlLocationPin } from "react-icons/sl";
import "../styles/contact.css";
import { LuMailCheck } from "react-icons/lu";
import { FiPhoneForwarded } from "react-icons/fi";
import map from "../images/qr.jpg";
import { FaMapLocationDot } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Contact = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  // Form input states
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    message: "",
  });

  const navigate = useNavigate();

  // Handle state selection
  const handleFilterState = (value) => {
    setSelectedState(value);
  };

  // Handle form input changes
  const handleChange = (e) => {
    if (e.target.name == "mobile") {
      if (e.target.value > 9999999999) return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Send email or form data to the backend
  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://api.arrowpublications.in/api/v1/contact-form",
        formData
      ); // Update with your actual endpoint
      if (data.success) {
        toast.success("Message sent successfully");
        setFormData({
          name: "",
          mobile: "",
          email: "",
          address: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  // Fetch states
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

  // Navigate based on selected state
  const handleFilterSelect = (selectedState) => {
    navigate(`/view-dealer-network?state=${selectedState}`);
  };

  return (
    <Layout title={"Contact us - Arrow Publication Pvt ltd"}>
      <div className="hero-5">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>
                  Contact
                  <span className="something ms-1">
                    <b>Us</b>
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="body1">
        <div className="p-1 d-flex justify-content-around mt-3 ">
          <div className="px-3 pt-1 pb-3 text-center border w-26 cart">
            <p className="address">
              <SlLocationPin className="location-icon" /> C-11 A & B, TSIIC,
              Moula-Ali, Hyderabad - 500 040
            </p>
          </div>
          <div className="px-3 pt-2 pb-3 border w-26 cart">
            <div className="text-center pb-1">
              <div className="mail">
                <span>
                  {" "}
                  <LuMailCheck className="mail-icon" />{" "}
                </span>
                mail@arrowpublicationindia.com
              </div>
            </div>
          </div>
          <div className="px-3 pt-2 pb-3 border w-25 cart">
            <div className="text-center pb-1">
              <div className="phone">
                <span>
                  {" "}
                  <FiPhoneForwarded className="phone-icon" />
                </span>
                +91 -9100999026, 9100999027
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
              <div className="">
                <h4 className="enq">Get in touch</h4>
                <div className="executive-search-filter executive-custom-select">
                  <select
                    className="executive-class-filter"
                    style={{ textAlign: "center" }}
                    onChange={(e) => handleFilterSelect(e.target.value)}
                  >
                    <option
                      className="option"
                      value={selectedState}
                      selected={selectedState ? false : true}
                    >
                      Arrow Executives &#9660;
                    </option>

                    {states?.map((s) => (
                      <option
                        key={s._id}
                        value={s._id}
                        selected={selectedState === s._id ? true : false}
                      >
                        {s.state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="enquiry-container enquiry-text">
                <h4 className="enq">
                  <b>Enquiry</b>
                </h4>
                <form onSubmit={sendEmail}>
                  <div className="mb-3 row">
                    <label
                      htmlFor="inputName"
                      className="col-sm-4 col-form-label inputname"
                    >
                      Name <span className="required">*</span>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control input"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="inputMobile"
                      className="col-sm-4 col-form-label inputname"
                    >
                      Mobile <span className="required">*</span>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control input"
                        name="mobile"
                        min="1000000000" // Minimum 10 digits
                        max="9999999999" // Maximum 10 digits
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="inputEmail"
                      className="col-sm-4 col-form-label inputname"
                    >
                      Email <span className="required">*</span>
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="email"
                        className="form-control input"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="inputAddress"
                      className="col-sm-4 col-form-label inputname"
                    >
                      Address
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control input"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="inputMessage"
                      className="col-sm-4 col-form-label inputname"
                    >
                      Message <span className="required">*</span>
                    </label>
                    <div className="col-sm-8">
                      <textarea
                        className="form-control input"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="submit-butn-wrapper">
                    <button className="submit-butn" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-6 location">
              <FaMapLocationDot className="loc-icon" />
              <img src={map} alt="Map" className="qr" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
