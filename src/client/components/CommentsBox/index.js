import React from 'react';
import CommentInfo from '../CommentInfo/';

class CommentsBox extends React.Component {
  render() {
    return (
      <div className="comment-box">
        <img className="user-pic" src={this.props.item.userPicURL} />
        <div className="comment-info">
          <CommentInfo
            commentTime={this.props.item.timeStamp}
            commentUsername={this.props.item.username}
            commentText={this.props.item.commentText}
          />
        </div>
      </div>
    );
  }
}

export default CommentsBox;
