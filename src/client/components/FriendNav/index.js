'use strict';

import React from 'react';
import {Link} from 'react-router-dom';

class FriendNav extends React.Component {
  render() {
    return (
      <nav className="friend-nav">
        <h1>Friends</h1>
        <Link className="all-friends" to="/" onClick={(e) => e.preventDefault()}>
          All Friends</Link>
        <Link className="new-posts" to="/" onClick={(e) => e.preventDefault()}>
          New Posts</Link>
        <Link className="birthdays" to="/" onClick={(e) => e.preventDefault()}>
          Birthdays</Link>
        <Link className="following" to="/" onClick={(e) => e.preventDefault()}>
          Following</Link>
      </nav>
    );
  }
}

export default FriendNav;
