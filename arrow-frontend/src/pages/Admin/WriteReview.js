import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { Modal } from "antd";
import ReviewForm from "../../components/Form/ReviewForm";
import axios from "axios";
const WriteReview = () => {
  const [review, setReview] = useState("");
  const [clientName, setClientName] = useState("");
  const [visible, setVisible] = useState(false);
  const [getReviews, setGetReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState("");

  const [updateReview, setUpdateReview] = useState("");
  const [updateClientName, setUpdateClientName] = useState("");

  //Get all review
  useEffect(() => {
    const getAllReview = async () => {
      try {
        const res = await axios.get(
          "https://api.arrowpublications.in/api/v1/review/get-all-review"
        );
        setGetReviews(res.data);
      } catch (error) {
        console.log("error Fetching all review");
      }
    };
    getAllReview();
  }, []);

  //update reviews
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://api.arrowpublications.in/api/v1/review/update-review/${selectedReview._id}`,
        { review: updateReview }
      );
      if (data.success) {
        swal("Congrats!", "Category Updated Successfully!", "success");
        setSelectedReview(null);
        setUpdateReview("");
        setVisible(false);
        getReviews();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  // create a new review
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://api.arrowpublications.in/api/v1/review/write-review",
        {
          review,
          clientName,
        }
      );
      if (res.data && res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  //Delete Review
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `https://api.arrowpublications.in/api/v1/review/delete-review/${pId}`
      );
      if (data.success) {
        swal("SuccessFull", `${review}Review Deleted Successfully!`, "success");

        getReviews();
      }
    } catch (error) {
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
              <h1>Write a Review</h1>

              <div className="mb-3">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Write Review"
                      className="form-control admin-form"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="form-control admin-form"
                      placeholder="Client Name"
                      required
                    />
                  </div>
                  <button type="submit" className="review-button">
                    Submit
                  </button>
                </form>
              </div>
              <div className="col-md-9">
                <div className="col-md-9">
                  <h1 className="text-center">All Reviews</h1>
                  <div className="border shadow">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Review</th>
                          <th scope="col">Client Name</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getReviews.map((r, index) => (
                          <tr key={index}>
                            <td>
                              <strong>{index + 1}</strong>
                            </td>
                            <td>{r.review}</td>
                            <td>{r.clientName}</td>
                            <td>
                              <button
                                className="review-edit-button mb-2"
                                onClick={() => {
                                  setVisible(true);
                                  setUpdateReview(r.review);
                                  setSelectedReview(r);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="review-dlt-button"
                                onClick={() => {
                                  handleDelete(r._id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <Modal
                  onCancel={() => setVisible(false)}
                  footer={null}
                  visible={visible}
                >
                  <ReviewForm
                    value={updateReview}
                    setValue={setUpdateReview}
                    handleSubmit={handleUpdate}
                  />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default WriteReview;
