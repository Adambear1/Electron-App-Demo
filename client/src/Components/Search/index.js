import React from "react";

function Search({ search, setValue }) {
  return (
    <div className="align-center mt-3">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            Ticker ^
          </span>
        </div>
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search for a Stock...."
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <div class="input-group-append">
          <button type="submit" className="btn btn-secondary" onClick={search}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
