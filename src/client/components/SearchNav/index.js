import React from 'react';
import {Link} from 'react-router-dom';

class SearchNav extends React.Component {
  render() {
    return (
      <nav className="search-nav">
        <Link className={this.props.searchType === 'people' ? 'search-link' : ''}
          to={'/search?type=people&q=' + this.props.query}>People</Link>
        <Link className={this.props.searchType === 'posts' ? 'search-link' : ''}
          to={'/search?type=posts&q=' + this.props.query}>Posts</Link>
        <Link to={'#'} onClick={function(event) {
          event.preventDefault();
        }}>Photos</Link>
        <Link to={'#'} onClick={function(event) {
          event.preventDefault();
        }}>Videos</Link>
        <Link to={'#'} onClick={function(event) {
          event.preventDefault();
        }}>Pages</Link>
        <Link to={'#'} onClick={function(event) {
          event.preventDefault();
        }}>Group</Link>
        <Link to={'#'} onClick={function(event) {
          event.preventDefault();
        }}>Apps</Link>
        <Link to={'#'} onClick={function(event) {
          event.preventDefault();
        }}>Events</Link>
      </nav>
    );
  }
}

export default SearchNav;
