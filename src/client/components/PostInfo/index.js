import React from 'react';

class PostInfo extends React.Component {
  render() {
    return (
      <div className="postInfo">
        <span className="likes">{this.props.postInfo.numOfLikes} likes</span>
        <span>{this.props.postInfo.numOfComments} comments</span>
        <span>{this.props.postInfo.numOfShares} shares</span>
      </div>
    );
  }
}

export default PostInfo;
