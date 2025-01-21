import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/Auth";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  // Params (Query)
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");

  //get user details
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setShippingAddress(address.shippingAddress);
    setCity(address.city);
    setState(address.state);
    setDistrict(address.district);
    setLandmark(address.landmark);
    setPincode(address.pincode);
  }, [auth?.user]);

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const address = {
        shippingAddress,
        city,
        state,
        district,
        landmark,
        pincode,
      };
      const { data } = await axios.put(
        "https://api.arrowpublications.in/api/v1/auth/profile",
        {
          name,
          email,
          phone,
          address,
        }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));

        toast.success("Profile Updated Successfully");
        if (redirect) {
          navigate(`/${redirect}`);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form className="form-user-profile" onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="row w-100 form-content">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="name">
                        Name<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control input-login"
                        id="name"
                        placeholder="Name"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email">
                        Email<span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control input-login"
                        id="email"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone">
                        Phone<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control input-login"
                        id="phone"
                        maxLength={12}
                        pattern="[4-9]{1}[0-9]{9,11}" // Adjusted pattern to allow 10-12 digits
                        inputMode="numeric"
                        title="Phone number must be between 10 to 12 digits long"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        placeholder="Phone"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="shippingAddress">
                        Shipping Address<span className="text-danger">*</span>
                      </label>
                      <textarea
                        rows={5}
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="form-control input-login border border-dark"
                        id="shippingAddress"
                        placeholder="Shipping Address"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="state">
                        State<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="form-control input-login"
                        id="state"
                        placeholder="State"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="district">
                        District<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="form-control input-login"
                        id="district"
                        placeholder="District"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="city">
                        City<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="form-control input-login"
                        id="city"
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="landmark">
                        Landmark
                        <span className="text-secondary">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="form-control input-login"
                        id="landmark"
                        placeholder="Landmark"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pincode">
                        Pincode<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        minLength={6}
                        maxLength={6}
                        pattern="\d*"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="form-control input-login"
                        id="pincode"
                        placeholder="Pincode"
                        required
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn w-100 text-white btn-primary"
                >
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

export default Profile;
