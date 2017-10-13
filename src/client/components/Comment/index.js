import React from 'react';
import './style.scss';
import CommentInfo from '../CommentInfo/';
import CommentInput from '../CommentInput/';

class Comment extends React.Component {
  render() {
    return (
      <div className='commentContainer'>
        <div className='commentBox'>
          <img className='userPic' src={this.props.CommentInfo.UserPicURL} />
          <div className='commentInfo'>
            <CommentInfo CommentTime={this.props.CommentInfo.CommentTime}/>
          </div>
        </div>
        <CommentInput />
      </div>
    );
  }
}

export default Comment;
