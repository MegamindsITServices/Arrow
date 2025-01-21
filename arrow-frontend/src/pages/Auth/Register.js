import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyle.css";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Enter a valid email";
    if (!password || password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!/\d/.test(password) || !/[!@#$%^&*]/.test(password))
      newErrors.password =
        "Password must contain at least one number and special character";
    if (!phone || phone.length < 10 || phone.length > 12)
      newErrors.phone = "Phone number must be 10-12 digits";
    if (!shippingAddress)
      newErrors.shippingAddress = "Shipping address is required";
    if (!securityQuestion)
      newErrors.securityQuestion = "Security question is required";
    if (!answer) newErrors.answer = "Security answer is required";
    if (!state) newErrors.state = "State is required";
    if (!district) newErrors.district = "District is required";
    if (!city) newErrors.city = "City is required";
    if (!pincode || pincode.length !== 6)
      newErrors.pincode = "Pincode must be 6 digits";
    if (!captchaValue) newErrors.captcha = "Please complete the captcha";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});

    try {
      const address = {
        shippingAddress,
        city,
        state,
        district,
        pincode,
        landmark,
      };
      const res = await axios.post(
        "https://api.arrowpublications.in/api/v1/auth/register",
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
          captchaValue, // Include captcha value in the request
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/auth/email-sent");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const onChangeCaptcha = (value) => {
    setCaptchaValue(value);
  };

  return (
    <>
      <Layout title={"Signup - Arrow Publication Pvt Ltd"}>
        <div className="form-container">
          <h4 className="title">Register</h4>
          <div className="row justify-content-center">
            <div className="col-md-9">
              <form onSubmit={handleSubmit}>
                <div className="row form-content">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control input-login"
                        placeholder="Name"
                      />
                      {errors.name && (
                        <small className="text-danger">{errors.name}</small>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control input-login"
                        placeholder="Email"
                      />
                      {errors.email && (
                        <small className="text-danger">{errors.email}</small>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control input-login"
                        placeholder="Password"
                      />
                      {errors.password && (
                        <small className="text-danger">{errors.password}</small>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control input-login"
                        pattern="\d*"
                        placeholder="Phone"
                      />
                      {errors.phone && (
                        <small className="text-danger">{errors.phone}</small>
                      )}
                    </div>
                    <div className="mb-3">
                      <textarea
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="form-control input-login border border-dark"
                        placeholder="Shipping Address"
                        rows={5}
                      />
                      {errors.shippingAddress && (
                        <small className="text-danger">
                          {errors.shippingAddress}
                        </small>
                      )}
                    </div>
                    <div className="mb-3">
                      <select
                        value={securityQuestion}
                        onChange={(e) => setSecurityQuestion(e.target.value)}
                        className="form-control input-login"
                        id="securityQuestion"
                      >
                        <option value="">Select Security Question</option>
                        <option value="favoritePetName">
                          Favorite Pet Name
                        </option>
                        <option value="favoriteFood">Favorite Food</option>
                        <option value="childhoodbestfriend">
                          Your Childhood Best Friend
                        </option>
                      </select>
                      {errors.securityQuestion && (
                        <small className="text-danger">
                          {errors.securityQuestion}
                        </small>
                      )}
                    </div>
                    {securityQuestion && (
                      <div className="mb-3">
                        <input
                          type="text"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          className="form-control input-login"
                          placeholder={
                            securityQuestion === "favoritePetName"
                              ? "Enter pet name"
                              : securityQuestion === "favoriteFood"
                              ? "Enter favorite food"
                              : "Enter your childhood best friend's name"
                          }
                        />
                        {errors.answer && (
                          <small className="text-danger">{errors.answer}</small>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="form-control input-login"
                        placeholder="State"
                      />
                      {errors.state && (
                        <small className="text-danger">{errors.state}</small>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="form-control input-login"
                        placeholder="District"
                      />
                      {errors.district && (
                        <small className="text-danger">{errors.district}</small>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="form-control input-login"
                        placeholder="City"
                      />
                      {errors.city && (
                        <small className="text-danger">{errors.city}</small>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        minLength={6}
                        pattern="\d*"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="form-control input-login"
                        placeholder="Pincode"
                      />
                      {errors.pincode && (
                        <small className="text-danger">{errors.pincode}</small>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="form-control input-login"
                        placeholder="Landmark (optional)"
                      />
                    </div>
                  </div>

                  <ReCAPTCHA
                    sitekey="6Lc5kvopAAAAAHgpNwhAuCQE4wcqfBd3dZ04mJW-"
                    onChange={onChangeCaptcha}
                    className="mb-4"
                  />
                  {errors.captcha && (
                    <small className="text-danger mb-3">{errors.captcha}</small>
                  )}

                  <button type="submit" className="login-button">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Register;
