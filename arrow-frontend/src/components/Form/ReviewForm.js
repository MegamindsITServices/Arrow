import React from "react";
import "../../styles/AdminDash.css";
const ReviewForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control review"
            placeholder="Update Review"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="Butn">
          Submit
        </button>
      </form>
    </>
  );
};

export default ReviewForm;
