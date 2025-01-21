import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePosts = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [title, setTitle] = useState();
  const [addresswithdate, setAddresswithdate] = useState();
  const [content, setContent] = useState();
  const [photo, setPhoto] = useState();
  const [secondPhoto, setSecondPhoto] = useState();
  const [thirdphoto, setThirdPhoto] = useState();
  const [id, setId] = useState();

  //get single posts
  const getSinglePost = async () => {
    try {
      const { data } = await axios.get(
        `https://api.arrowpublications.in/api/v1/posts/get-single-post/${params.slug}`
      );
      setTitle(data.post.title);
      setId(data.post._id);
      setAddresswithdate(data.post.addresswithdate);
      setContent(data.post.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglePost();
  }, []);

  // update posts
  const handleUpdate = async (e) => {
    try {
      const postData = new FormData();
      postData.append("title", title);
      postData.append("addresswithdate", addresswithdate);
      postData.append("content", content);
      photo && postData.append("photo", photo);
      secondPhoto && postData.append("secondPhoto", secondPhoto);
      thirdphoto && postData.append("thirdPhoto", thirdphoto);

      const { data } = axios.put(
        `https://api.arrowpublications.in/api/v1/posts/update-post/${id}`,
        postData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/view_posts");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <>
      <Layout>
        <div className="mb-3">
          <label className="Butn col-md-12">
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
                src={`https://api.arrowpublications.in/api/v1/posts/get-photo/${params.slug}`}
                alt="product_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          )}
        </div>
        <div className="mb-3">
          <label className="Butn col-md-12">
            {secondPhoto ? secondPhoto.name : "Upload Photo"}
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
          {secondPhoto ? (
            <div className="text-center">
              <img
                src={URL.createObjectURL(secondPhoto)}
                alt="product_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          ) : (
            <div className="text-center">
              <img
                src={`https://api.arrowpublications.in/api/v1/posts/get-secondphoto/${params.slug}`}
                alt="product_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          )}
        </div>
        <div className="mb-3">
          <label className="Butn col-md-12">
            {thirdphoto ? thirdphoto.name : "Upload Photo"}
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
                src={`https://api.arrowpublications.in/api/v1/posts/get-thirdphoto/${params.slug}`}
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
            value={title}
            placeholder="write a name"
            className="form-control form"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            type="text"
            value={addresswithdate}
            placeholder="write a description"
            className="form-control form"
            onChange={(e) => setAddresswithdate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={content}
            placeholder="write a name"
            className="form-control form"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button className="edit-button" onClick={handleUpdate}>
            Update Post
          </button>
        </div>
      </Layout>
      ;
    </>
  );
};

export default UpdatePosts;
