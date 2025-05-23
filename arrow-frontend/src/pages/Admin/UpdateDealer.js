import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Select } from "antd";
const { Option } = Select;
const UpdateDealer = () => {
  const { id } = useParams();
  const [dealer, setDealer] = useState();
  const [dealername, setDealername] = useState("");
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [area, setArea] = useState("");
  const [designation, setDesignation] = useState("");
  const [rank, setRank] = useState();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("dealername", dealername);

      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("designation", designation);

      formData.append("area", area);
      photo && formData.append("photo", photo);
      formData.append("rank", rank);
      formData.append("state", state);

      const { data } = await axios.put(
        `https://api.arrowpublications.in/api/v1/dealer/update-dealer/${id}`,
        formData
      );
      if (data?.success) {
        swal("Congrats", "Post Uploaded SuccessFully", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDealerData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.arrowpublications.in/api/v1/dealer/get-dealer/${id}`
      );
      console.log(data);
      setAddress(data?.address);
      setArea(data?.area);
      setDealername(data?.dealername);
      setDesignation(data?.designation);
      setEmail(data?.email);
      setPhone(data?.phone);
      setRank(data?.rank);
      setState(data?.state);
    } catch (error) {
      toast.error("Failed to get executive data");
    }
  };

  const getAllState = async () => {
    try {
      const response = await axios.get(
        "https://api.arrowpublications.in/api/v1/dealerstate/get-state"
      );
      const data = response.data;
      // console.log("Response data:", data);
      if (data && data.success) {
        // console.log("Setting states:", data.dealerState);
        setStates(data.dealerState);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDealerData();
    getAllState();
  }, []);
  return (
    <>
      <Layout>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Update Executive Network</h1>

              <div className="mb-3">
                <form onSubmit={handleUpdate}>
                  <div className="col-md-8">
                    <Select
                      bordered={false}
                      placeholder="Select State"
                      size="large"
                      showSearch
                      value={state}
                      className="form-select mb-3"
                      onChange={(value) => {
                        setState(value);
                      }}
                    >
                      {states?.map((state) => (
                        <Option key={state._id} value={state._id}>
                          {state.state}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div className="mb-3">
                    <label className="Butn col-md-8">
                      {photo ? photo.name : "Upload Photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>
                  <div className="mb-3">
                    {photo ? (
                      <div className="">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="executive_photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      </div>
                    ) : (
                      <div className="">
                        <img
                          src={`https://api.arrowpublications.in/api/v1/dealer/dealer-photo/${id}`}
                          alt="product_photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      value={dealername}
                      onChange={(e) => setDealername(e.target.value)}
                      placeholder="Name"
                      className="form-control admin-form"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="form-control admin-form"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="Enter Designation"
                      className="form-control admin-form"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control admin-form"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter Phone Number"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control admin-form"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="Enter area"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control admin-form"
                      placeholder="Full Address"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      value={rank}
                      onChange={(e) => setRank(e.target.value)}
                      className="form-control admin-form"
                      placeholder="Enter Rank"
                      required
                    />
                  </div>

                  <button type="submit" className="login-button">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateDealer;
