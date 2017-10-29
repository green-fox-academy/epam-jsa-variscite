import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <input
          type="text"
          required
          placeholder="Search"
          className="search-input"
          name="input"
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
