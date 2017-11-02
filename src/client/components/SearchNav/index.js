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
        }} className='hide-mobile'>Photos</Link>
        <Link to={'#'} onClick={function(event) {
          event.preventDefault();
        }} className='hide-mobile'>Videos</Link>
        <Link to={'#'} onClick={function(event) {
          event.preventDefault();
        }} className='hide-mobile'>Pages</Link>
        <Link to={'#'} onClick={function(event) {
          event.preventDefault();
        }} className='hide-mobile'>Group</Link>
        <Link to={'#'} onClick={function(event) {
          event.preventDefault();
        }} className='hide-mobile'>Apps</Link>
        <Link to={'#'} onClick={function(event) {
          event.preventDefault();
        }} className='hide-mobile'>Events</Link>
      </nav>
    );
  }
}

export default SearchNav;
