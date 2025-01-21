import React, { useEffect, useState } from "react";
import { FaRegHandPointRight } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import "../../styles/navbar.css";
import "../../styles/style.css";
import "../../styles/footer.css";
import { Link } from "react-router-dom";
import axios from "axios";
import InstallPWAButton from "../InstallPWAButton";

const Footer = () => {
  const [visitors, setVisitor] = useState();

  const getVisitors = async () => {
    const { data } = await axios.get(
      "https://api.arrowpublications.in/api/v1/visitors"
    );
    setVisitor(data.visitors);
  };

  useEffect(() => {
    getVisitors();
  }, []);

  return (
    <>
      <div className="font">
        <footer id="footer">
          <div className="w-full mx-auto">
            <div className="row mx-auto justify-self-center">
              <div className="col-md col-sm-3">
                <a href="/">
                  <h4 className="arrow-footer">
                    <b>Arrow Publications Pvt. Ltd.</b>
                  </h4>
                </a>
                <div className="footer-about">
                  <p className="footer-address">
                    #C-11A & B, TSIIC, Moula-Ali Hyderabad - 500040 <br />{" "}
                    Telangana, India
                  </p>
                </div>
                {/* <h4 className="available-at">
                  Available At
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
                    alt="amazon"
                    className="amazon"
                  />
                </h4> */}
              </div>
              <div className="col-md col-sm-3">
                <div className="useful-link">
                  <h2 className="quick">Quick Links</h2>

                  <div className="use-links">
                    <li>
                      <Link to="/">
                        <i className="fa-solid fa-angles-right" /> Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/about">
                        <i className="fa-solid fa-angles-right" /> About Us
                      </Link>
                    </li>

                    <li>
                      <Link to="/Contact">
                        <i className="fa-solid fa-angles-right" />
                        Contact Us
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
              <div className="col-md col-sm-3">
                <div className="useful-link">
                  <div className="use-links">
                    <li>
                      <Link to="/privacy-policy">
                        <i className="fa-solid fa-angles-right" /> Privacy
                        Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/refund-policy">
                        <i className="fa-solid fa-angles-right" /> Refund Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/shipping-and-return-policy">
                        <i className="fa-solid fa-angles-right" />
                        Shipping & Return Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/terms-and-conditions">
                        <i className="fa-solid fa-angles-right" />
                        Terms and Conditions
                      </Link>
                    </li>
                  </div>
                </div>
              </div>

              <div className="col-md col-sm-3">
                <div className="useful-link">
                  <h2 className="pay-online">Pay Online</h2>

                  {/* <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1280px-PhonePe_Logo.svg.png"
                    alt="pay online"
                    className="pay-online-img"
                  /> */}
                  <img src="/images/qr-code.jpeg" className="pay-online-img" />
                </div>
              </div>
              <div className="col col-md-3 mx-auto useful-link">
                <div className="visit-counter">
                  <p className="visit">{visitors}</p>
                  <p>Visitors</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="footer-hr" />
          <div className="footer-content">
            <h5 className="copywritename">
              &copy; Arrow Publications Pvt. Ltd. All Rights Reserved.
            </h5>
            <div className="social-media-links">
              <FaRegHandPointRight />
              <a href="https://www.facebook.com/" className="ms-2 links">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/" className="ms-2 links">
                <AiFillInstagram />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                className="ms-2 links"
              >
                <FaSquareXTwitter />
              </a>
              <a
                href="https://www.youtube.com/c/ArrowPublicationsPVTLTD"
                target="_blank"
                className="ms-2 links"
                rel="noreferrer"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.linkedin.com/company/arrowpublicationsindia-pvt-ltd"
                target="_blank"
                className="ms-2 links"
                rel="noreferrer"
              >
                <BsLinkedin />
              </a>
            </div>
          </div>
          <div className="social-media-links-mobile">
            <FaRegHandPointRight />
            <a href="https://www.facebook.com/" className="ms-2 links">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/" className="ms-2 links">
              <AiFillInstagram />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="ms-2 links"
            >
              <FaSquareXTwitter />
            </a>
            <a
              href="https://www.youtube.com/c/ArrowPublicationsPVTLTD"
              target="_blank"
              className="ms-2 links"
              rel="noreferrer"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.linkedin.com/company/arrowpublicationsindia-pvt-ltd"
              target="_blank"
              className="ms-2 links"
              rel="noreferrer"
            >
              <BsLinkedin />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
