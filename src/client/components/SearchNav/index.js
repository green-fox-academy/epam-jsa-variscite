import React from 'react';
import {Link} from 'react-router-dom';

class SearchNav extends React.Component {
  render() {
    return (
      <nav className="search-nav">
        <Link to="/search">People</Link>
        <Link to={'/search?type=people&q=' + this.props.query}>People</Link>
        <Link to={'/search?type=posts&q=' + this.props.query}>Posts</Link>
        <Link to={'/search'}>Photos</Link>
        <Link to={'/search'}>Videos</Link>
        <Link to={'/search'}>Pages</Link>
        <Link to={'/search'}>Group</Link>
        <Link to={'/search'}>Apps</Link>
        <Link to={'/search'}>Events</Link>
      </nav>
    );
  }
}

export default SearchNav;
