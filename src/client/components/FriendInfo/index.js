'use strict';

import React from 'react';

class FriendInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div key={this.props.item._id} className="friend-info">
        <img src={this.props.userPicURL} />
        <p>{this.props.item.username}<span>{this.props.item.numberOfFriends} friends</span></p>
        <button onClick={this.props.onUnfriendClick}>unfriend</button>
      </div>
    );
  }
}

export default FriendInfo;
