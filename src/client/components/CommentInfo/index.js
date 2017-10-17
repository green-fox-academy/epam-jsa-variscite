import React from 'react';

class CommentInfo extends React.Component {
  render() {
    return (
      <div>
        <p className="text">
          <span className="name">{this.props.commentUsername} </span>
          {this.props.commentText}
        </p>
        <button className="like-button">Like</button><span> · </span>
        <button>Reply</button><span> · </span>
        <span className="time">{this.props.commentTime}</span>
      </div>
    );
  }
}

export default CommentInfo;
