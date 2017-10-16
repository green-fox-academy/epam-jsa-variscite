import React from 'react';

class CommentInput extends React.Component {

  render() {
    return (
      <div className="commentInput">
        <img className="userPic" src={this.props.myPicURL} />
        <textarea placeholder="post a comment"></textarea>
      </div>
    );
  }
}

export default CommentInput;
