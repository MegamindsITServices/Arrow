import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateBanner = () => {
  const [photo, setPhoto] = useState("");
  const [secondphoto, setSecondPhoto] = useState("");
  const [thirdphoto, setThirdPhoto] = useState("");

  const getSingleBanner = async () => {
    try {
      const { data } = await axios.get(
        `https://api.arrowpublications.in/api/v1/banner/get-banner/banner`
      );
      if (data?.success) {
        console.log(data);
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleBanner();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const bannerImage = new FormData();
      photo && bannerImage.append("photo", photo);
      secondphoto && bannerImage.append("secondphoto", secondphoto);
      thirdphoto && bannerImage.append("thirdphoto", thirdphoto);

      const { data } = await axios.put(
        `https://api.arrowpublications.in/api/v1/banner/update-banner/banner`,
        bannerImage
      );
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error("Please try after sometime");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="d-flex justify-content-center">Update Banner</h1>
            <div className="mb-3">
              <label className="Butn col-md-12">
                {photo ? photo.name : "Upload First Banner 🡇"}
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
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`https://api.arrowpublications.in/api/v1/banner/get-first-banner-image/banner`}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="Butn col-md-12">
                {secondphoto ? secondphoto.name : "Upload Second Banner 🡇"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setSecondPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {secondphoto ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(secondphoto)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`https://api.arrowpublications.in/api/v1/banner/get-second-banner-image/banner`}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="Butn col-md-12">
                {thirdphoto ? thirdphoto.name : "Upload Third Banner 🡇"}
                <input
                  type="file"
                  name="thirdphoto"
                  accept="image/*"
                  onChange={(e) => setThirdPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {thirdphoto ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(thirdphoto)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`https://api.arrowpublications.in/api/v1/banner/get-third-banner-image/banner`}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button className="Butn" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateBanner;
