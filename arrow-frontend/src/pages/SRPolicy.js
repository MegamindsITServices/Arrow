import React from "react";
import Layout from "../components/Layout/Layout";
const SRPolicy = () => {
  return (
    <Layout title={"Shipping & Return Policy - Arrow Publication Pvt ltd"}>
      <div>
        <section className="px-5">
          <div className="container">
            <h1 className="heading text-center">Shipping and Return Policy</h1>
          </div>
          <div className="my-5 ">
            <p>
              Arrow Publications Pvt. Ltd. is dedicated to dispatching orders
              with high quality packages and within the promised time frame, as
              customer satisfaction is our top priority. Our team ensures that
              the orders are shipped via reputed courier services such as DTDC,
              Professional Couriers, Track on Couriers and Indian Speed Post
              services in a good condition.
              <br /> <br />
              All the orders are processed within 2 working days (excluding
              Sundays and National Holidays) from the date of receipt and
              typically deliver them within 5 to 7 working days depending on the
              logistics availability to the shipping address mentioned in the
              order.
              <br /> <br />
              The customers are responsible for paying the shipping costs for
              returning the purchased item. The cost of return shipping will be
              deducted from your refund. If the shipping item is over Rs.
              10,000/-, the customer should purchase shipping insurance or a
              traceable shipping service.
              <br /> <br />
              For any assistance, you can contact us at
              <strong> mail@arrowpublicationsindia.com </strong>. We are happy
              to help you out.
            </p>
          </div>
          <div className="my-5 ">
            <h4 style={{ color: "#d56742" }}>Returns</h4>
            <p>
              If the party returns the ordered item, we will refund it within 7
              working days, subject to the bank details mentioned by the party.
              <br /> <br /> To return your product, you should mail your product
              to: C-11 A & B, TSIIC, Moula-Ali, Hyderabad - 500 040. Telangana,
              India.
              <br /> <br /> To be eligible for a return, your item must be
              unused and in the same condition that you received it. It must
              also be in the original packaging.
              <br /> <br /> Several types of goods are exempt from being
              returned. Perishable goods such as food, flowers, newspapers or
              magazines cannot be returned. We also do not accept products that
              are intimate or sanitary goods, hazardous materials, or flammable
              liquids or gases.
              <br /> <br />
              Additional non-returnable items:
              <ul>
                <li style={{ listStyleType: "initial !important" }}>
                  {" "}
                  Gift cards
                </li>
                <li style={{ listStyleType: "initial !important" }}>
                  {" "}
                  Downloadable software products
                </li>
              </ul>
              <p>
                To complete your return, we require a receipt or proof of
                purchase.{" "}
              </p>{" "}
              <p>Please do not send your purchase back to the manufacturer.</p>
              <p>
                {" "}
                There are certain situations where only partial refunds are
                granted: (if applicable){" "}
              </p>
              <p> Any item that is returned whithin 30 days after delivery</p>
            </p>
          </div>
          <div className="my-5 ">
            <h4 style={{ color: "#d56742" }}>Refunds (if applicable)</h4>
            <p>
              Once your return is received and inspected, we will send you an
              email to notify you that we have received your returned item. We
              will also notify you of the approval or rejection of your refund.
              <p>
                If you are approved, then your refund will be processed, and a
                credit will automatically be applied to your credit card or
                original method of payment, within 10 days.
              </p>
            </p>
          </div>
          <div className="my-5 ">
            <h4 style={{ color: "#d56742" }}>
              Late or missing refunds (if applicable)
            </h4>
            <p>
              If you haven’t received a refund yet, first check your bank
              account again.
            </p>
            <p>
              Then contact your credit card company, it may take some time
              before your refund is officially posted.
            </p>
            <p>
              Next contact your bank. There is often some processing time before
              a refund is posted.
            </p>{" "}
            <p>
              If you’ve done all of this and you still have not received your
              refund yet, please contact us at mail@arrowpublicationsindia.com.
            </p>{" "}
          </div>
          <div className="my-5 ">
            <h4 style={{ color: "#d56742" }}>Sale items (if applicable)</h4>
            <p>
              Only regular priced items may be refunded, unfortunately sale
              items cannot be refunded.
            </p>
          </div>
          <div className="my-5 ">
            <h4 style={{ color: "#d56742" }}>Exchanges (if applicable)</h4>
            <p>
              We only replace items if they are defective or damaged. If you
              need to exchange it for the same item, send us an email at
              mail@arrowpublicationsindia.com.com and send your item to: C-11 A
              & B, TSIIC, Moula-Ali, Hyderabad - 500 040. Telangana, India.
            </p>
          </div>
          <div className="my-5 ">
            <h4 style={{ color: "#d56742" }}>Gifts</h4>
            <p>
              If the item was marked as a gift when purchased and shipped
              directly to you, you’ll receive a gift credit for the value of
              your return. Once the returned item is received, a gift
              certificate will be mailed to you.
            </p>
            <p>
              If the item wasn’t marked as a gift when purchased, or the gift
              giver had the order shipped to themselves to give to you later, we
              will send a refund to the gift giver and he will find out about
              your return
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SRPolicy;
