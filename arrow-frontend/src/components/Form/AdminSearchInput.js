import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import "../../styles/Searchbar.css";

const AdminSearchInput = () => {
  const [values, setValues] = useSearch();
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  // const handleInputChange = (e) => {
  //   setKeyword(e.target.value);
  // };
  const handleInputChange = async (e) => {
    const { value } = e.target;
    setKeyword(value);

    try {
      // Fetch suggestions from the backend
      const { data } = await axios.get(
        `https://api.arrowpublications.in/api/v1/product/search/${value}`
      );
      setSuggestions(data); // Update suggestions based on user input
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://api.arrowpublications.in/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, result: data });
      setKeyword("");
      navigate("/admin-search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="desktop-view">
        <form
          className="d-flex search-form"
          role="search"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control me-2 form-input"
            type="search"
            placeholder="Enter UID"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button className="search-button" type="submit">
            <IoSearch />
          </button>
        </form>
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion._id}
                onClick={() => setKeyword(suggestion.name)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
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
                placeholder="Enter UID"
                aria-label="Search"
                value={keyword}
                onChange={handleInputChange}
              />
              <button className="search-button" type="submit">
                <IoSearch />
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default AdminSearchInput;
