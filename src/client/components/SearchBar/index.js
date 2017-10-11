import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input
          type="text"
          required
          placeholder="Search"
          className="searchInput"
        />
        <input
          type="submit"
          value=""
          className="searchSubmit"
        />
      </form>
    );
  }
}

export default SearchBar;
