import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import UserMenu from "../../components/Layout/UserMenu";
import SubAdminMenu from "../../components/Layout/SubadminMenu";

const SubAdminUpdatePassword = () => {
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const navigate = useNavigate();

  // Regex for password validation (min 6 chars, at least 1 number, and 1 special character)
  const passwordValidationRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;

  // Validate passwords
  const validatePasswords = () => {
    let valid = true;
    let newPasswordError = "";
    let confirmNewPasswordError = "";

    if (!newPassword.match(passwordValidationRegex)) {
      newPasswordError =
        "New password must be at least 6 characters, contain a number and a special character.";
      valid = false;
    }

    if (newPassword !== confirmNewPassword) {
      confirmNewPasswordError = "Passwords do not match.";
      valid = false;
    }

    setErrors({
      newPassword: newPasswordError,
      confirmNewPassword: confirmNewPasswordError,
    });
    return valid;
  };

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    try {
      const res = await axios.put(
        `https://api.arrowpublications.in/api/v1/auth/update-password`,
        {
          password,
          newPassword,
        }
      );
      toast.success("Password Updated Successful. Please Login!");
      navigate("/dashboard/user/dashboard");
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Update Password - Arrow Publication Pvt. Ltd."}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <SubAdminMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h4 className="text-center">Update Password</h4>

                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="password"
                    placeholder="Enter Current Password"
                    style={{ width: "83%" }}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control"
                    id="newPassword"
                    placeholder="Enter New Password"
                    style={{ width: "83%" }}
                    required
                  />
                  {errors.newPassword && (
                    <small className="text-danger">{errors.newPassword}</small>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="form-control"
                    id="confirmNewPassword"
                    placeholder="Confirm New Password"
                    style={{ width: "83%" }}
                    required
                  />
                  {errors.confirmNewPassword && (
                    <small className="text-danger">
                      {errors.confirmNewPassword}
                    </small>
                  )}
                </div>

                <button type="submit" className="login-button">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubAdminUpdatePassword;
