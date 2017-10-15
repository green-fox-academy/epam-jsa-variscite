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
            <CommentInfo CommentTime={this.props.CommentInfo.CommentTime} CommentUsername={this.props.CommentInfo.Username}/>
          </div>
        </div>
        <CommentInput MyPicURL={this.props.CommentInfo.MyPicURL} />
      </div>
    );
  }
}

export default Comment;
