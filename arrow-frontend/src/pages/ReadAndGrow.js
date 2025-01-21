import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/readandgrow.css";
import KidReadingImage from "../images/Kid reading.jpg";
const ReadAndGrow = () => {
  return (
    <Layout title={"Read And Grow - Arrow Publication Pvt ltd"}>
      <div className="ash-color">
        <div className="hero3">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5">
                <div className="intro-excerpt-read">
                  <h2 className="read-and-grow">
                    <b className="read">
                      Read<span className="ms-1">and</span>
                    </b>
                    <span className="something-grow ms-1">
                      <b>Grow</b>
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid testimonial  my-5">
          <div className="container py-5">
            <p className="texts">
              Life’s best teacher, they say, is experience. <br /> And for
              children, reading is a foretaste of life’s experience.
              <br />
              When children read, they enter different worlds and give wings to
              their imagination. <br /> They take in values hidden within the
              pages. <br /> Every book equips children with new words to use.{" "}
              <br />
              Reading makes them stop to wonder, think and discover.
              <br />
              Let’s make sure books reach the hands and minds of children and
              they evolve as readers. <br /> Let reading add to their range of
              experience and help them grow.
            </p>
          </div>
        </div>
        <div className="font">
          <div className="container-fluid  ">
            <div className="container ">
              <div className="row">
                <div
                  className="col-lg-7 col-md-7 col-sm-12 wow fadeIn"
                  data-wow-delay=".5s"
                >
                  <h3>
                    Books{" "}
                    <span className="Trove">
                      <b>Trove</b>
                    </span>
                  </h3>

                  <p className="new-color texts">
                    Our aim is to make young people learn something new every
                    day. And we do it by making them discover that reading is an
                    enjoyable habit. We believe the library is the place to
                    begin with.
                  </p>

                  <p className="mb-4 new-color texts">
                    Our latest library catalogue ensures the right kind of books
                    reach your library. The catalogue lists books on different
                    subjects that we have specially selected for each age. Our
                    curated collection has some of the best books from
                    publishers across the globe. We have classics, fiction and
                    reference books.You can also order books of your choice.
                  </p>
                  <p className="mb-4 new-color texts">
                    We have attached an order form at the end of the catalogue.
                    We request you to go through it and place your order. Do
                    encourage every child to read and grow.
                    <br /> <br />
                    {/* We also offer a few samples of audiobooks for children to
                  listen and grow. */}
                  </p>
                  {/* <a href="#" className="link-audio">
                  Audiobooks
                </a>
                <hr className="hr" /> */}
                </div>

                <div
                  className="col-lg-5 col-md-6 col-sm-12 wow fadeIn"
                  data-wow-delay=".3s"
                >
                  <div className="h-90 position-relative">
                    <img
                      src={KidReadingImage}
                      className="img-fluid kid-img"
                      alt="Kid Reading"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReadAndGrow;
