import React from 'react';

class CommentInfo extends React.Component {
  render() {
    return (
      <div>
        <p className='text'><span className='name'>{this.props.CommentUsername} </span> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliqt, sed diam vtua. At accusam et.</p>
        <button className='likeButton'>Like</button><span> · </span>
        <button>Reply</button><span> · </span>
        <p className='time'>{this.props.CommentTime}</p>
      </div>
    );
  }
}

export default CommentInfo;
