'use strict';

import React from 'react';
import {Link} from 'react-router-dom';

class ProfileNav extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/profile">Timeline</Link>
        <Link to="/" onClick={(e) => e.preventDefault()}>About</Link>
        <Link to="/friendlist">Friends</Link>
        <Link to="/" onClick={(e) => e.preventDefault()}>Photos</Link>
        <Link to="/" onClick={(e) => e.preventDefault()}>More</Link>
      </nav>
    );
  }
}

export default ProfileNav;
