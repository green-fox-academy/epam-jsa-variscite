import React from 'react';

class PostInfo extends React.Component {
  render() {
    return (
      <div className="post-info">
        <span className="likes">{this.props.numOfLikes} likes</span>
        <span>{this.props.postInfo.numOfComments} comments</span>
        <span>{this.props.postInfo.numOfShares} shares</span>
      </div>
    );
  }
}

export default PostInfo;
