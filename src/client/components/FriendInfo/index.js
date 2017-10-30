'use strict';

import React from 'react';

class FriendInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="friend-info">
        <img src="https://www.nbr.co.nz/sites/default/files/blog_post_img/Trump-impact_0.jpg" />
        <p>Donald<span>10 friends</span></p>
        <button>friends</button>
      </div>
    );
  }
}

export default FriendInfo;
