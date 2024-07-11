import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/banner.css";
import { getConfig } from "../../utils/request";
import toast from "react-hot-toast";
import swal from "sweetalert";

const ViewBanner = () => {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const getAllBanners = async () => {
    try {
      const { data } = await axios.get("/api/v1/banner/get-banner");
      setBanners(data.banner);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBanners();
  }, []);

  //delete banner
  const handleDelete = async (pid) => {
    try {
      await getConfig();
      const { data } = await axios.delete(
        `/api/v1/banner/delete-banner/${pid}`
      );
      if (data.success) {
        swal("SuccessFull", "banner deleted successfully", "success");
        navigate("/dashboard/admin/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong");
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
            <h1 className="d-flex justify-content-center">Update Banners</h1>
            {banners.map((banner, index) => (
              <div key={index}>
                <img
                  src={`/api/v1/banner/get-first-banner-image/banner`}
                  alt={banner.title}
                  className="banner-img"
                />

                {/* <img
                    src={`/api/v1/banner/get-second-banner-image/${banner.slug}`}
                    alt={banner.title}
                    className="banner-img"
                  />

                  <img
                    src={`/api/v1/banner/get-third-banner-image/${banner.slug}`}
                    alt={banner.title}
                    className="banner-img"
                  /> */}

                <button
                  className="Butn mb-4 ms-4"
                  onClick={() => handleDelete(banner._id)}
                >
                  {" "}
                  Delete
                </button>
                <Link to={`/dashboard/admin/banner/${banner.slug}`}>
                  <button className="Butn mb-4 ms-4"> Edit</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewBanner;
