import React from 'react';

class PostInfo extends React.Component {
  render() {
    return (
      <div className="postInfo">
        <span className="likes">{this.props.PostInfo.NumOfLikes} likes</span>
        <span>{this.props.PostInfo.NumOfComments} comments</span>
        <span>{this.props.PostInfo.NumOfShares} shares</span>
      </div>
    );
  }
}

export default PostInfo;
