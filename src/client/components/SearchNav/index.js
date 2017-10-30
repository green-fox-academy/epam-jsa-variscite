import React from 'react';

class SearchNav extends React.Component {
  render() {
    return (
      <nav className="search-nav">
        <Link to="/search">People</Link>
        <button>Posts</button>
        <button>Photos</button>
        <button>Video</button>
        <button>Pages</button>
        <button>Group</button>
        <button>Apps</button>
        <button>Events</button>
      </nav>
    );
  }
}

export default SearchNav;
