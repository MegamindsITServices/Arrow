import React from "react";
import Modal from "react-modal";
import SearchInput from "../Form/SearchInput";
import { IoSearch } from "react-icons/io5";
import "../../styles/Searchbar.css";
Modal.setAppElement("#root"); // Set the root element for accessibility
const SearchModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Search Modal"
    >
      <button onClick={onRequestClose}>Close Modal</button>
      <SearchInput />
    </Modal>
  );
};

export default SearchModal;
