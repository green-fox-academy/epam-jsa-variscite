import React from 'react';

class PostHeader extends React.Component {
  render() {
    return (
      <div className="postHeader">
        <img className="userPic" src={this.props.userInfo.userPicURL} />
        <div className="postTitle">
          <p className="name">{this.props.userInfo.username}</p>
          <p className="time">{this.props.userInfo.postTime}</p>
        </div>
      </div>
    );
  }
}

export default PostHeader;
