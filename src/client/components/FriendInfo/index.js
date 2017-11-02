'use strict';

import React from 'react';
import {Link} from 'react-router-dom';

class FriendInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div key={this.props.item._id} className="friend-info">
        <img src={this.props.userPicURL} />
        <Link className="user-name" to={'/profile?=' + this.props.item.username}>{this.props.item.username}<span>{this.props.item.numberOfFriends} friends</span></Link>
        <button onClick={this.props.onUnfriendClick}>unfriend</button>
      </div>
    );
  }
}

export default FriendInfo;
