import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import "../../styles/ForgotPassword.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [pending, setPending] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPending(true);
      const { data } = await axios.post(
        "https://api.arrowpublications.in/api/v1/auth/forgot-password",
        formData
      );
      toast.success("Please check your email");
      navigate("/auth/email-sent");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Login failed:", error.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-password-container">
        <h1 className="forgot-password-title">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              placeholder="Enter Email"
              className="form-input"
              required
            />
          </div>

          <button disabled={pending} type="submit" className="form-button">
            {pending ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
