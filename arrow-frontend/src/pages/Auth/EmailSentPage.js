import React from "react";
import "../../styles/Emailsent.css";

function EmailSentPage() {
  return (
    <div className="email-sent-container">
      <div className="content-box">
        <h2 className="title">Check your inbox</h2>
        <p className="message">
          We are glad, that you’re with us. We’ve sent you a verification link
          to your email address.
        </p>
      </div>
    </div>
  );
}

export default EmailSentPage;
