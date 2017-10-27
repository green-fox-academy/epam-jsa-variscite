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
          <img className="user-pic" src={this.props.userInfo.newUserPicURL} />
          <div className="post-title">
            {this.props.userInfo.username[0] !== this.props.userInfo.username[1] ?
              <p className="name">
                {this.props.userInfo.username[0]}
                <span> shared </span>
                {this.props.userInfo.username[1]}
                <span> 's </span>
                post
              </p> :
              <p className="name">
                {this.props.userInfo.username[0]}
                <span> shared his </span>
                post
              </p>}
            <p className="time">{this.props.userInfo.timeInDate}</p>
          </div>
        </div>
        <div className="origin-header">
          <img className="user-pic" src={this.props.userInfo.userPicURL} />
          <div className="post-title">
            <p className="name">{this.props.userInfo.username[0]} </p>
            <p className="time">{this.props.userInfo.originTimeInDate}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PostHeader;
