import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <form action="/search" method="get">
        <input
          type="text"
          required
          placeholder="Search"
          className="search-input"
          name="q"
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
