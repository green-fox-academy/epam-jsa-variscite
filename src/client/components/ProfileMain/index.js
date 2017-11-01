'use strict';

import React from 'react';
import Intro from '../Intro';
import ProfilePost from '../ProfilePost';

class ProfileMain extends React.Component {
  render() {
    return (
      <div className="profile-main">
        <Intro user={this.props.user}/>
        <ProfilePost userInfo={this.props.userInfo} myName={this.props.user}/>
      </div>
    );
  }
}

export default ProfileMain;
