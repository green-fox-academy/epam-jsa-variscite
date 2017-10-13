import React from 'react';
import './style.scss';
import CommentInfo from '../CommentInfo/';
import CommentInput from '../CommentInput/';

class Comment extends React.Component {
  render() {
    return (
      <div className='commentContainer'>
        <div className='commentBox'>
          <img className='userPic' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9HKJuqE3ZmpAWaWHEbFAvsCsktkwEFZ-aNKy9eo1VGvTh_hE' />
          <div className='commentInfo'>
            <CommentInfo />
          </div>
        </div>
        <CommentInput />
      </div>
    );
  }
}

export default Comment;
