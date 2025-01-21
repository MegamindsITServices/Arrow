import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/teamarrow.css";
import CVB from "../images/CVB Krishna.PNG";
import srinivasa from "../images/Srinivasa Rao.PNG";
import suresh from "../images/Chukkala Suresh.PNG";
import Rao from "../images/Subba Rao.PNG";

const TeamArrow = () => {
  return (
    <Layout>
      <div className="hero2">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt-team-arrow">
                <h1>
                  Team
                  <span className="something ms-1">
                    <b>Arrow</b>
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="team-body">
        <div className="card1">
          <div className="card">
            <img src={CVB} className="team-pic" alt="..." />
            <div className="card-body-team">
              <p className="card-text-team">
                <b>CVB Krishna, Managing Director</b>, leads from the front
                displaying the same enthusiasm and passion for every new
                publication, since the company was set up. He is actively
                engaged in each stage of publishing from concept, production to
                marketing. With his proven experience of over two decades, he
                plays a pivotal role in planning financial resources, directing
                and overseeing operations. <br />
                {/* He drives the team to explore
                opportunities for product development and scale up the range and
                reach of Arrow textbooks. By leveraging their marketing strength
                and building trusted relationships with diverse schools, he has
                created a brand identity for Arrow Publications across India. */}
              </p>
            </div>
          </div>
        </div>
        <div className="card1">
          <div className="card">
            <div className="card-body-team">
              <p className="card-text-team">
                <b>P Srinivasa Rao, Director</b>, with his acumen for strategy
                and sales, looks for new ways to maximise opportunities and
                expand the market. He has played a key role in shaping the
                marketing team and giving it a cutting edge in a competitive
                scenario. <br />
                Equipped with excellent communication skills, he sells the value
                proposition of the Arrow textbooks in a clear, engaging way to
                influence the buying decision.
                {/* He connects with educational
                institutions and business associates effortlessly and builds
                long-term relationships. An optimist by nature, he sets the pace
                for Arrow Publications to create new milestones. */}
              </p>
            </div>
            <img src={srinivasa} className="card-img-top" alt="..." />
          </div>
        </div>
        <div className="card1">
          <div className="card">
            <img src={suresh} className="card-img-top" alt="..." />
            <div className="card-body-team">
              <p className="card-text-team">
                <b>Chukkala Suresh, Director</b>, reviews the market trends and
                has a flair for identifying the potential for new product
                development. He is involved in the ideation and creation process
                of publications and suggests innovative ways to add value.{" "}
                <br /> A team builder, he has strong interpersonal skills that
                help to keep the sales teams inspired and on target.
                {/* He sets
                clear goals and outlines strategic plans for achieving them. He
                equips and empowers the teams to act on the plan and take Arrow
                Publications to greater heights of success. */}
              </p>
            </div>
          </div>
        </div>
        <div className="card1">
          <div className="card">
            <div className="card-body-team">
              <p className="card-text-team">
                <b> G Subba Rao, Director</b>, has been an integral part of
                production since the inception of the company. With his in-depth
                knowledge of page design and layout, he coordinates with
                authors, artists and editors until the books are completed
                according to industry standards. <br /> A diligent performer, he
                maintains the schedule for printing and delivery without
                compromising on quality.
                {/* With his quiet confidence and calm
                attitude, he encourages the Arrow team to stay focused and
                deliver their best even under stringent deadlines. */}
              </p>
            </div>
            <img src={Rao} className="card-img-top" alt="..." />
          </div>
        </div>
      </div>

      {/* <body>
        <div className="card-team mb-3">
          <div className="row g-0">
            <div className="col-md-3">
              <img
                src={CVB}
                style={{ height: "43vh", width: "80%" }}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <p className="card-text">
                  <b>CVB Krishna, Managing Director</b>, leads from the front
                  displaying the same enthusiasm and passion for every new
                  publication, since the company was set up. He is actively
                  engaged in each stage of publishing from concept, production
                  to marketing. With his proven experience of over two decades,
                  he plays a pivotal role in planning financial resources,
                  directing and overseeing operations. <br /> He drives the team
                  to explore opportunities for product development and scale up
                  the range and reach of Arrow textbooks. By leveraging their
                  marketing strength and building trusted relationships with
                  diverse schools, he has created a brand identity for Arrow
                  Publications across India.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-team mb-3" style={{ maxWidth: 1040 }}>
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <p className="card-text">
                  <b>P Srinivasa Rao, Director</b>, with his acumen for strategy
                  and sales, looks for new ways to maximize opportunities and
                  expand the market. He has played a key role in shaping the
                  marketing team and giving it a cutting edge in a competitive
                  scenario. <br /> Equipped with excellent communication skills,
                  he sells the value proposition of the Arrow textbooks in a
                  clear, engaging way to influence the buying decision. He
                  connects with educational institutions and business associates
                  effortlessly and builds long-term relationships. An optimist
                  by nature, he sets the pace for Arrow Publications to create
                  new milestones.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <img
                src={srinivasa}
                style={{ height: "43vh", width: "100%" }}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
          </div>
        </div>
        <div className="card-team mb-3">
          <div className="row g-0">
            <div className="col-md-3">
              <img
                src={suresh}
                style={{ height: "43vh", width: "80%" }}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <p className="card-text">
                  <b>Chukkala Suresh, Director</b>, reviews the market trends
                  and has a flair for identifying the potential for new product
                  development. He is involved in the ideation and creation
                  process of publications and suggests innovative ways to add
                  value. <br /> A team builder, he has strong interpersonal
                  skills that help to keep the sales teams inspired and on
                  target. He sets clear goals and outlines strategic plans for
                  achieving them. He equips and empowers the teams to act on the
                  plan and take Arrow Publications to greater heights of
                  success.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-team mb-3">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <p className="card-text">
                  <b> G Subba Rao, Director</b>, has been an integral part of
                  production since the inception of the company. With his
                  in-depth knowledge of page design and layout, he coordinates
                  with authors, artists and editors until the books are
                  completed according to industry standards. <br /> A diligent
                  performer, he maintains the schedule for printing and delivery
                  without compromising on quality. With his quiet confidence and
                  calm attitude, he encourages the Arrow team to stay focused
                  and deliver their best even under stringent deadlines.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <img
                src={Rao}
                style={{ height: "43vh", width: "100%" }}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
          </div>
        </div>
      </body> */}

      {/* <div>
        <div className="subscribe-arrow">
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
  );
};

export default TeamArrow;
