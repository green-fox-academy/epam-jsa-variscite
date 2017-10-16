import React from 'react';

class CommentInfo extends React.Component {
  render() {
    return (
      <div>
        <p className="text">
          <span className="name">{this.props.commentUsername} </span>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliqt,
          sed diam vtua. At accusam et.
        </p>
        <button className="like-button">Like</button><span> · </span>
        <button>Reply</button><span> · </span>
        <span className="time">{this.props.commentTime}</span>
      </div>
    );
  }
}

export default CommentInfo;
