import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import SearchDropdown from "../search-dropdown/search-dropdown.component";
import { selectInputValue } from "../../redux/search/search.selectors";
import { selectCollectionItems } from "../../redux/shop/shop.selectors";
import { setInputValue } from "../../redux/search/search.actions";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import "./search-input.scss";

const SearchInput = ({
  inputHidden,
  setInputValue,
  inputValue,
  inputRef,
  collectionItems,
  fetchCollectionsStart,
}) => {
  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className={"search-input-container" + (inputHidden ? " hidden" : "")}>
      <form onSubmit={handleSubmit}>
        <input
          className="search-input"
          onChange={handleChange}
          placeholder="Search Modernist"
          value={inputValue}
          aria-hidden={inputHidden}
          ref={inputRef}
          tabIndex={inputHidden ? "-1" : "0"}
        />
      </form>
      {inputValue && (
        <SearchDropdown
          collectionItems={collectionItems}
          inputValue={inputValue}
          fetchCollectionsStart={fetchCollectionsStart}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setInputValue: (inputValue) => dispatch(setInputValue(inputValue)),
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

const mapStateToProps = createStructuredSelector({
  inputValue: selectInputValue,
  collectionItems: selectCollectionItems,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);