import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/team.css";
const PrivacyPolicy = () => {
  return (
    <Layout title={"Privacy Policy - Arrow Publication Pvt ltd"}>
      <div>
        <section className="px-5">
          <div className="container">
            <h1 className="heading text-center">Privacy Policy</h1>
          </div>
          <div className="my-5 fs-6">
            <h4 style={{ color: "#d56742" }}>Basic Exposure Of Our Policy</h4>
            <p>
              Thanks for visiting our privacy policy for your better insight
              towards us. In our privacy policy, we just gather your personal
              details like name, gender, email- id , contact details, payment
              and transaction details, residential address etc
            </p>
          </div>
          <div className="my-5 fs-6">
            <h4 style={{ color: "#d56742" }}>If you Register With Us</h4>
            <p>
              We protect this information for your better admittance in our
              site. By offering these credentials as yourself, you are now
              permitted to utilize all activities in our site. By registering,
              you will get the following services under the “terms&conditions
              “in our site.
            </p>
            <ul>
              <li style={{ listStyleType: "initial !important" }}>
                Buy any product of us.
              </li>
              <li style={{ listStyleType: "initial !important" }}>
                Getting latest news.
              </li>
              <li style={{ listStyleType: "initial !important" }}>
                Getting the mails/Bills in case of your transactions.
              </li>
              <li style={{ listStyleType: "initial !important" }}>Payment</li>
              <li style={{ listStyleType: "initial !important" }}>
                Giving Feedback
              </li>
              <li style={{ listStyleType: "initial !important" }}>
                Send us a message.
              </li>
            </ul>
          </div>
          <div className="my-5 fs-6">
            <h4 style={{ color: "#d56742" }}>For Your Detail</h4>
            <p>
              We also collect some impersonal info of following from the third
              party linked to your account with the aid of cookies and other web
              analytics
            </p>
            <ul>
              <li style={{ listStyleType: "initial !important" }}>
                Ip address
              </li>
              <li style={{ listStyleType: "initial !important" }}>
                Payment provider account details
              </li>
              <li style={{ listStyleType: "initial !important" }}>Browser</li>
            </ul>
          </div>
          <div className="my-5 fs-6">
            <h4 style={{ color: "#d56742" }}>Hope You Won’t Face This</h4>
            <p>
              If you won’t give your proper details then we can’t bid our
              services to you and you may not be entitled to make any
              transactions.
            </p>
          </div>{" "}
          <div className="my-5 fs-6">
            <h4 style={{ color: "#d56742" }}>
              Confidentiality For Your Credentials
            </h4>
            <p>
              We can promise you the following on your credentials protection.
            </p>
            <ul>
              <li style={{ listStyleType: "initial !important" }}>
                We can’t sell or rent your details without your approval.
              </li>
              <li style={{ listStyleType: "initial !important" }}>
                We can’t allocate your details in case of merging or selling our
                company without your authorization.
              </li>
              <li style={{ listStyleType: "initial !important" }}>
                We can’t share your details with any user of our site without
                your approval.
              </li>
            </ul>
          </div>
          <div className="my-5 fs-6">
            <h4 style={{ color: "#d56742" }}>
              Areas Shared With Your Credentials
            </h4>
            <p>We may disclose your details with the following people:</p>
            <ul>
              <li style={{ listStyleType: "initial !important" }}>
                Our company (Accountants, financial consultants etc)
              </li>
              <li style={{ listStyleType: "initial !important" }}>
                Government authorities in case of compulsion.
              </li>
            </ul>
          </div>
          <div className="my-5">
            <p className="text-danger fs-5">NOTE: </p>
            <p>
              We are free to revise our privacy policy which is effective
              immediately. So, Make sure to take look on our policy regularly.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
