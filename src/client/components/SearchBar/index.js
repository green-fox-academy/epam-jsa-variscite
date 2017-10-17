import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input
          type="text"
          required
          placeholder="Search"
          className="search-input"
        />
        <input
          type="submit"
          value=""
          className="search-submit"
        />
      </form>
    );
  }
}

export default SearchBar;
