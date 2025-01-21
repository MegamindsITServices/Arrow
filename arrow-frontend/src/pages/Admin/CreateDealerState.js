import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import DealerStateForm from "../../components/Form/DealerStateForm";
import axios from "axios";
import toast from "react-hot-toast";

import { Modal } from "antd";
const CreateDealerState = () => {
  const [dealerStates, setDealerStates] = useState([]);
  const [state, setState] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedState, setUpdatedState] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://api.arrowpublications.in/api/v1/dealerstate/create-dealer-state",
        {
          state,
        }
      );
      if (data?.success) {
        toast.success("Dealer state created successfully");
        getAllDealerStates();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDealerStates = async () => {
    try {
      const { data } = await axios.get(
        "https://api.arrowpublications.in/api/v1/dealerstate/get-state"
      );
      console.log("Fetched dealer states:", data);
      if (data?.success) {
        setDealerStates(data?.dealerState || []);
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDealerStates();
  }, []);
  //update dealer state
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://api.arrowpublications.in/api/v1/dealerstate/update-dealer-state/${selected._id}`,
        { state: updatedState }
      );
      if (data?.success) {
        toast.success("Dealer state updated");
        setSelected(null);
        setUpdatedState("");
        setVisible(false);
        getAllDealerStates();
      } else {
        toast.error(toast.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://api.arrowpublications.in/api/v1/dealerstate/delete-dealer-state/${id}`
      );
      if (data?.success) {
        toast.success("Dealer state deleted successfully");
        getAllDealerStates();
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
            <h1 className="">Executive State Controller</h1>

            <div className="p-3 w-50">
              <DealerStateForm
                handleSubmit={handleSubmit}
                value={state}
                setValue={setState}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">State</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dealerStates.map((d) => (
                    <tr key={d._id}>
                      <td>{d.state}</td>
                      <td>
                        <button
                          className="edit-button"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedState(d.state);
                            setSelected(d);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="dlt-button ms-2"
                          onClick={() => {
                            handleDelete(d._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                visible={visible}
              >
                <DealerStateForm
                  value={updatedState}
                  setValue={setUpdatedState}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateDealerState;
