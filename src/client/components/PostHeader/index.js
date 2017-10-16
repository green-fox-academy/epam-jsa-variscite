import React from 'react';

class PostHeader extends React.Component {
  render() {
    return (
      <div className="postHeader">
        <img className="userPic" src={this.props.UserInfo.UserPicURL} />
        <div className="postTitle">
          <p className="name">{this.props.UserInfo.Username}</p>
          <p className="time">{this.props.UserInfo.PostTime}</p>
        </div>
      </div>
    );
  }
}

export default PostHeader;
