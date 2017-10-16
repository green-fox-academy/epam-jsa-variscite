import React from 'react';

class CommentInput extends React.Component {

  render() {
    return (
      <div className='commentInput'>
        <img className='userPic' src={this.props.myPicURL} />
        <input placeholder='post a comment'></input>
      </div>
    );
  }
}

export default CommentInput;
