import Layout from "../../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import "../../styles/product.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
// import UpdatePostForm from "../../components/Form/UpdatePostForm";
// import { Modal } from "antd";
const ViewPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  // const [updatePost, setUpdatePost] = useState("");
  // const [selectedPost, setSelectedPost] = useState("");
  // const [visible, setVisible] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.arrowpublications.in/api/v1/posts/get-all-posts"
        );

        if (response.data && Array.isArray(response.data.posts)) {
          setAllPosts(response.data.posts);
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  //delete posts
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://api.arrowpublications.in/api/v1/posts/delete-post/${id}`
      );
      if (data.success) {
        navigate("/dashboard/admin/dashboard");
        swal("SuccessFull", "post deleted successfully", "success");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //
  //     const { data } = await axiosInstance.put(
  //       `https://api.arrowpublications.in/api/v1/posts/update-post/${selectedPost._id}`,
  //       updatePost
  //     );
  //     if (data.success) {
  //       swal("Congrats!", "Dealer Updated Successfully!", "success");
  //       setSelectedPost(null);
  //       setUpdatePost("");
  //       setVisible(false);
  //     }
  //   } catch (error) {
  //     console.log("Something went wrong");
  //   }
  // };

  return (
    <>
      <Layout>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Posts List</h1>
            <div className="row">
              {allPosts.map((post, index) => (
                <div className="col-md-3" key={index}>
                  <div className="card-post mb-3">
                    <img
                      src={`https://api.arrowpublications.in/api/v1/posts/get-photo/${post.slug}`}
                      className="card-img-top"
                      alt=""
                    />
                    <div className="card-body-product">
                      <h5 className="post-name">Title: {post.title}</h5>
                      <h5 className="post-desc">
                        Date: {post.addresswithdate}
                      </h5>
                      <p className="post-desc">
                        Desc: {post.content.substring(0, 40)} ...
                      </p>
                    </div>
                    <button
                      className="post-dlt-button ms-2"
                      onClick={() => {
                        handleDelete(post._id);
                      }}
                    >
                      Delete
                    </button>
                    <Link to={`/dashboard/admin/posts/${post.slug}`}>
                      <button className="post-dlt-button ms-2">Update</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <UpdatePostForm
              value={updatePost}
              setValue={setUpdatePost}
              handleSubmit={handleUpdate}
            />
          </Modal> */}
        </div>
      </Layout>
    </>
  );
};

export default ViewPosts;
