import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/style.css";
import "../styles/navbar.css";
import "../styles/Aboutus.css";
import AboutBackground from "../images/about-background.jpg";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Helmet } from "react-helmet";
import arrowOwners from "../images/arrow-owners.png";
import axios from "axios";
import { Carousel } from "react-bootstrap";
const About = () => {
  const [getReviews, setGetReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  //get all reviews
  //Get all review
  useEffect(() => {
    const getAllReview = async () => {
      try {
        const res = await axios.get(
          "https://api.arrowpublications.in/api/v1/review/get-all-review"
        );
        setGetReviews(res.data);
      } catch (error) {
        console.log("error Fetching all review");
      }
    };
    getAllReview();
  }, []);
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? getReviews.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === getReviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <Helmet>
        <title>About us - Arrow Publication Pvt ltd</title>
        <meta
          name="description"
          content="Welcome to Arrow Publication Pvt. Ltd. We offer a wide range of textbooks and educational resources for students."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <Layout title={"About us - Arrow Publication Pvt ltd"}>
        <div className="ash-color">
          <div className="hero1">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-lg-5">
                  <div className="intro-excerpt-about">
                    <h1>
                      About
                      <span className="us ms-1">
                        <b>Us</b>
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid py-5 ">
            <div className="container py-5">
              <div className="row g-5">
                <div
                  className="col-lg-7 col-md-7 col-sm-12 wow fadeIn"
                  data-wow-delay=".5s"
                >
                  <p className="new-color about-texts">
                    Arrow Publications was established in 2000. The arrow, our
                    company logo, reflects our mission and aim - to provide good
                    quality educational books for students. Since then, we have
                    been on target to become a brand name in the market and
                    carve our own successful growth path.
                  </p>

                  <p className="mb-4 new-color about-texts">
                    In a short span of time, Arrow Publications Pvt. Ltd., has
                    emerged as a strong presence in educational publishing. With
                    an enterprising and energetic marketing team at the helm and
                    a portfolio of over 500 publications, we cater to more than
                    12,000 schools across India. As an ISO 9001:2015 certified
                    company, we aim to ensure high quality standards in terms of
                    content, design, printing and production.
                  </p>
                  <p className=" new-color about-texts">
                    The wide range of Arrow textbooks complies with the
                    curricula of various school boards and meets the
                    requirements of students from pre-primary to high school. We
                    also provide customised textbooks to a few chain of schools.
                    We have won the trust of several reputed schools with our
                    quality content, online resources and timely response.
                  </p>
                </div>

                <div
                  className="col-lg-5 col-md-7 col-sm-10 wow fadeIn"
                  data-wow-delay=".3s"
                >
                  <div className="h-100 position-relative">
                    <img
                      src={arrowOwners}
                      className="img-fluid w-100 rounded"
                      alt="Kid Reading"
                    />
                  </div>
                </div>
                <p className="testimonials about-texts">
                  At Arrow Publications, we aspire to promote multidisciplinary
                  and interdisciplinary education. We provide books for core
                  subjects including Arts & Crafts, General Knowledge, Value
                  Education and Life Skills to enable holistic growth for
                  learners. We focus on creating content that is well-researched
                  and designed using language that relates to students and
                  practitioners. The content, pedagogy and assessments are
                  appropriate for each subject and stage of education and in
                  sync with the objectives and learning outcomes defined by the
                  National Curriculum Framework 2022 (NCF-FS) and National
                  Curriculum Framework for School Education 2023 (NCF-SE).
                  <br /> <br />
                  Arrow Publications believes that when we put in our best
                  effort, the rewards will come. It is heartwarming to receive
                  the continued support of principals and teachers across
                  schools in India for all these years. It energises us to work
                  harder and make the learning journey a fulfilling experience
                  with the Arrow brand.
                </p>
              </div>
            </div>
          </div>
          {/* <div className="image-container">
            <img src={AboutBackground} alt="" className="about-back" />
            <div className="image-text-about">
              What they say{" "}
              <span className="about-our-service">about our services</span>
              <br />
              <div className="carousel-content">
                {getReviews.map((review, index) => (
                  <div
                    key={index}
                    className={
                      index === currentIndex ? "active-slide" : "inactive-slide"
                    }
                  >
                    <p className="para-about">{review.review}</p>
                    <h6 className="client-name">
                      Client Name <br />
                      <span className="CEO">{review.clientName}</span>
                    </h6>
                  </div>
                ))}
              </div>
              <IoIosArrowDropleftCircle
                className="arrowmark-about"
                onClick={handlePrev}
              />
              <IoIosArrowDroprightCircle
                className="arrowmark-about"
                onClick={handleNext}
              />
            </div>
          </div> */}
          <div className="image-container">
            <img src={AboutBackground} alt="" className="about-back" />
            <div className="image-text-about">
              What they say{" "}
              <span className="about-our-service">about our services</span>
              <br />
              <div className="carousel-content-about">
                <Carousel activeIndex={currentIndex} onSelect={() => {}}>
                  {getReviews.map((review, index) => (
                    <Carousel.Item key={index}>
                      <div className="testimonial-slide">
                        <p className="para-about">{review.review}</p>
                        <h6 className="client-name">
                          Client Name <br />
                          <span className="CEO">{review.clientName}</span>
                        </h6>
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <IoIosArrowDropleftCircle
                className="arrowmark-about"
                onClick={handlePrev}
              />
              <IoIosArrowDroprightCircle
                className="arrowmark-about"
                onClick={handleNext}
              />
            </div>
          </div>
        </div>
      </Layout>
      <script src="../js/about.js"></script>
    </>
  );
};

export default About;
