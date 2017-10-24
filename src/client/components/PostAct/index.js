import React from 'react';

class PostAct extends React.Component {
  render() {
    return (
      <div className="post-act">
        <button className={this.props.likeStatus} onClick={this.props.onLikeClick}>Like</button>
        <button className="comment">Comment</button>
        <button className="share">Share</button>
      </div>
    );
  }
}

export default PostAct;
