import React from 'react';

class PostInfo extends React.Component {
  render() {
    return (
      <div className="post-info">
        <span className="likes">{this.props.postInfo.numOfLikes} likes</span>
        <span>{this.props.postInfo.comments.length} comments</span>
        <span>{this.props.postInfo.numOfShares} shares</span>
      </div>
    );
  }
}

export default PostInfo;
