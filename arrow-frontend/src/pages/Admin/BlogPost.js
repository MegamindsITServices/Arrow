import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const BlogPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [addresswithdate, setAddressWithDate] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [secondphoto, setSecondPhoto] = useState("");
  const [thirdphoto, setThirdPhoto] = useState("");
  //create product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("addresswithdate", addresswithdate);
      formData.append("content", content);
      formData.append("photo", photo);
      formData.append("secondphoto", secondphoto);
      formData.append("thirdphoto", thirdphoto);

      const { data } = await axios.post(
        "https://api.arrowpublications.in/api/v1/posts/upload-post",
        formData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/view_posts");
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
    <>
      <Layout>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Post an Activity</h1>
              <form onSubmit={handleCreate}>
                <div className="mb-3">
                  <label className="Butn col-md-12">
                    {photo ? photo.name : "Upload blog Photo"}
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
                  <label className="Butn col-md-12">
                    {secondphoto
                      ? secondphoto.name
                      : "Upload second blog Photo"}
                    <input
                      type="file"
                      name="secondphoto"
                      accept="image/*"
                      onChange={(e) => setSecondPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  <label className="Butn col-md-12">
                    {thirdphoto ? thirdphoto.name : "Upload third blog Photo"}
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
                  <input
                    type="text"
                    value={title}
                    placeholder="Post Title"
                    className="form-control form"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={addresswithdate}
                    placeholder="Write an address & Date"
                    className="form-control form"
                    onChange={(e) => setAddressWithDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={content}
                    placeholder="Post Description"
                    className="form-control form"
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <button type="submit" className="Butn">
                    Create Post
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

export default BlogPost;
