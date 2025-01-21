import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import swal from "sweetalert";
import toast from "react-hot-toast";
import axios from "axios";

const HomePageBookPost = () => {
  const [bookphoto, setBookPhoto] = useState("");

  //create book post photo
  const handleCreateBookPost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("bookphoto", bookphoto);

      const { data } = await axios.post(
        "https://api.arrowpublications.in/api/v1/bookphoto/create-home-book",
        formData
      );
      if (data?.success) {
        toast.success("Book image upload successfully");
      } else {
        swal("Congrats", "Book Post Uploaded SuccessFully", "success");
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
            <h1 className="d-flex justify-content-center">
              HomePage Book Post Controller
            </h1>

            <form onSubmit={handleCreateBookPost}>
              <div className="mb-3">
                <label className="Butn col-md-12">
                  {bookphoto ? bookphoto.name : "Upload Book Post Photo"}

                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setBookPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {bookphoto && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(bookphoto)}
                      alt="banner-image"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mt-4  d-flex justify-content-center ">
                <button className="Butn" type="submit">
                  Create Book Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePageBookPost;
