import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPasssword = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  // Regex for password validation (min 6 chars, at least 1 number, and 1 special character)
  const passwordValidationRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;

  // Validate passwords
  const validatePasswords = () => {
    let valid = true;
    let newPasswordError = "";
    let confirmNewPasswordError = "";

    if (!password.match(passwordValidationRegex)) {
      newPasswordError =
        "New password must be at least 6 characters, contain a number and a special character.";
      valid = false;
    }

    if (password !== confirmPassword) {
      confirmNewPasswordError = "Passwords do not match.";
      valid = false;
    }

    setErrors({
      password: newPasswordError,
      confirmPassword: confirmNewPasswordError,
    });
    return valid;
  };

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }
    try {
      if (password !== confirmPassword) {
        toast.error("Password Do not match");
        return;
      }
      const res = await axios.post(
        `https://api.arrowpublications.in/api/v1/auth/reset-password/${token}`,
        {
          password,
          confirmPassword,
        }
      );
      toast.success("Password Reset Successfull. Please Login!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Forgot Password - Arrow Publication pvt ltd."}>
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Password"
              style={{ width: "83%" }}
              required
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Confirm Password"
              style={{ width: "83%" }}
              required
            />
            {errors.confirmPassword && (
              <small className="text-danger">{errors.confirmPassword}</small>
            )}
          </div>

          <button type="submit" className="login-button">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ResetPasssword;
