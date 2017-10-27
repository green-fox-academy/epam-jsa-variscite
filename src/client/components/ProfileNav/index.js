'use strict';

import React from 'react';

class ProfileNav extends React.Component {
  render() {
    return (
      <nav>
        <button>Timeline</button>
        <button>About</button>
        <button>Friends</button>
        <button>Photos</button>
        <button>More</button>
      </nav>
    );
  }
}

export default ProfileNav;
