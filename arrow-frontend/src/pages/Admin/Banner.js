import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import swal from "sweetalert";
import toast from "react-hot-toast";

const Banner = () => {
  const [photo, setPhoto] = useState("");
  const [secondphoto, setSecondPhoto] = useState("");
  const [thirdphoto, setThirdPhoto] = useState("");
  //   const [title, setTitle] = useState("");

  // create banner photos
  const handleCreateBanner = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("secondphoto", secondphoto);
      formData.append("thirdphoto", thirdphoto);
      //   formData.append("title", title);

      const { data } = await axios.post(
        "https://api.arrowpublications.in/api/v1/banner/create-banner",
        formData
      );
      if (data?.success) {
        toast.success(data?.message);
      } else {
        swal("Congrats", "Post Uploaded SuccessFully", "success");
        console.log(formData);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
            <h1 className="d-flex justify-content-center">Banner Controller</h1>
            <form onSubmit={handleCreateBanner}>
              <div className="mb-3">
                <label className="Butn col-md-10">
                  {photo ? photo.name : "Upload First Banner Photo"}

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
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="banner-image"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="Butn col-md-10">
                  {secondphoto
                    ? secondphoto.name
                    : "Upload Second Banner Photo"}

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
                {secondphoto && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(secondphoto)}
                      alt="banner-image"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="Butn col-md-10">
                  {thirdphoto ? thirdphoto.name : "Upload Third Banner Photo"}

                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setThirdPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {thirdphoto && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(thirdphoto)}
                      alt="banner-image"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              {/* <div className="mb-3">
                <input
                  type="text"
                  value={title}
                  placeholder="Post Title"
                  className="form-control form"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div> */}
              <div className="mt-4 d-flex justify-content-center">
                <button className="Butn" type="submit">
                  Create Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Banner;
