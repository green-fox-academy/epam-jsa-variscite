import React from 'react';

class PostHeader extends React.Component {

  render() {
    return (
      <div className="post-header">
        <img className="user-pic" src={this.props.userInfo.userPicURL} />
        <div className="post-title">
          <p className="name">{this.props.userInfo.username}</p>
          <p className="time">{this.props.userInfo.timeStamp}</p>
        </div>
      </div>
    );
  }
}

export default PostHeader;
