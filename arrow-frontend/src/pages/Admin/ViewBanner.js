import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/banner.css";
import toast from "react-hot-toast";
import swal from "sweetalert";

const ViewBanner = () => {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [bannerId, setBannerId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previousPhoto, setPreviousPhoto] = useState(null);
  const navigate = useNavigate();

  const getAllBanners = async () => {
    try {
      const { data } = await axios.get(
        "https://api.arrowpublications.in/api/v1/banner/get-banner"
      );
      setBanners(data.banner);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBanners();
  }, []);

  const handleDelete = async (bannerId) => {
    try {
      const { data } = await axios.delete(
        `https://api.arrowpublications.in/api/v1/banner/delete-banner/${bannerId}`
      );
      if (data.success) {
        swal("Successful", "Banner deleted successfully", "success");
        getAllBanners(); // Refresh banners list
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const handleEdit = async (banner) => {
    setTitle(banner.title);
    setPhoto(null);
    setPreviousPhoto(banner._id); // Set the previous photo's ID for display
    setBannerId(banner._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      if (bannerId) {
        await axios.put(
          `https://api.arrowpublications.in/api/v1/banner/update-banner/${bannerId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Banner updated successfully");
        window.location.reload();
      } else {
        await axios.post(
          "https://api.arrowpublications.in/api/v1/banner/create-banner",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Banner created successfully");
      }
      getAllBanners();
      setTitle("");
      setPhoto(null);
      setPreviousPhoto(null);
      setBannerId(null);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 w-md-75">
            <h1 className="d-flex justify-content-center">Manage Banners</h1>
            {/* <div className="mb-3 col-md-8">
              <input
                type="text"
                value={title}
                placeholder="Banner Title"
                className="form-control form border "
                onChange={(e) => setTitle(e.target.value)}
              />
            </div> */}
            <div className="mb-3 ">
              {bannerId ? <h4>Update Banner</h4> : <h4>Create a new Banner</h4>}

              <label className="upload-img col-md-8">
                {photo ? photo.name : "Upload Banner Photo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  hidden
                />
              </label>
              {photo ? (
                <div className="text-left my-4 col-md-8">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="banner"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : previousPhoto ? (
                <div className="text-left my-4 col-md-8">
                  <img
                    src={`https://api.arrowpublications.in/api/v1/banner/get-banner-image/${previousPhoto}`}
                    alt="banner"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : null}
            </div>
            <div className="mt-4 mb-4">
              <button
                disabled={loading}
                className="Butn"
                onClick={handleSubmit}
              >
                {loading
                  ? "Submitting..."
                  : bannerId
                  ? "Update Banner"
                  : "Create Banner"}
              </button>
            </div>
            <h2 className="my-5">Existing Banners</h2>
            {banners.map((banner, index) => (
              <div key={index} className="d-sm-flex mb-5">
                <img
                  src={`https://api.arrowpublications.in/api/v1/banner/get-banner-image/${banner._id}`}
                  alt={banner.title}
                  className="banner-img"
                />
                <div className="pt-3 pt-md-0 ps-md-5">
                  <button
                    className="Butn mb-4  h-10"
                    onClick={() => handleDelete(banner._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="Butn mb-4 ms-4"
                    onClick={() => handleEdit(banner)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewBanner;
