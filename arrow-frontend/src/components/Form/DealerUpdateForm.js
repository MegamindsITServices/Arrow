import React from "react";

const DealerUpdateForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control review"
            placeholder="Enter Dealer Name"
            value={value.dealername} // Accessing dealer name
            onChange={(e) => setValue({ ...value, dealername: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control review"
            placeholder="Enter Person Name"
            value={value.personname} // Accessing person name
            onChange={(e) => setValue({ ...value, personname: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control review"
            placeholder="Enter Address"
            value={value.address} // Accessing address
            onChange={(e) => setValue({ ...value, address: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control review"
            placeholder="Enter Phone No"
            value={value.phone} // Accessing phone number
            onChange={(e) => setValue({ ...value, phone: e.target.value })}
          />
        </div>
        <button type="submit" className="Butn">
          Submit
        </button>
      </form>
    </>
  );
};

export default DealerUpdateForm;
