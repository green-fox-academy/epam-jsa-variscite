'use strict';

import React from 'react';
import AddPost from '../AddPost';

class ProfilePost extends React.Component {
  render() {
    return (
      <div className="profile-post">
        <AddPost />
      </div>
    );
  }
}

export default ProfilePost;
