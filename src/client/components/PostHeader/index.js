import React from 'react';

class PostHeader extends React.Component {
  render() {
    if (typeof this.props.userInfo.username === 'string') {
      return (
        <div className="post-header">
          <img className="user-pic" src={this.props.userInfo.userPicURL} />
          <div className="post-title">
            <p className="name">{this.props.userInfo.username} </p>
            <p className="time">{this.props.userInfo.timeInDate}</p>
          </div>
        </div>
      );
    }
    return (
      <div className="origin post-header">
        <div className="share-header">
          <img className="user-pic" src={this.props.userInfo.userPicURL} />
          <div className="post-title">
            <p className="name">
              {this.props.userInfo.username[0]}<span>{this.props.userInfo.username[1]}</span>{this.props.userInfo.username[2]}
            </p>
            <p className="time">{this.props.userInfo.timeInDate}</p>
          </div>
        </div>
        <div className="origin-header">
          <img className="user-pic" src={this.props.userInfo.userPicURL} />
          <div className="post-title">
            <p className="name">{this.props.userName[0]} </p>
            <p className="time">{this.props.userInfo.timeInDate}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PostHeader;
