import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import "../../styles/Searchbar.css";
const ToggleSearch = () => {
  const [values, setValues] = useSearch();
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://api.arrowpublications.in/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, result: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mobile-view">
        <form
          className="d-flex search-form"
          role="search"
          onSubmit={handleSubmit}
        >
          <div className="search-toggle">
            <button
              className="search-button"
              type="button"
              onClick={toggleSearch}
            >
              <IoSearch />
            </button>
          </div>
          {showSearch && (
            <div className="search-input">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={keyword}
                onChange={handleInputChange}
              />
              <button className="search-button" type="submit">
                button
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default ToggleSearch;
