import React from 'react';
import './style.scss';
import CommentInfo from '../CommentInfo/';
import CommentInput from '../CommentInput/';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: 'Hillary Clinton',
      CommentTime: '10th Oct at 11:42PM',
      UserPicURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9HKJuqE3ZmpAWaWHEbFAvsCsktkwEFZ-aNKy9eo1VGvTh_hE',
    };
  }
  render() {
    return (
      <div className='commentContainer'>
        <div className='commentBox'>
          <img className='userPic' src={this.state.UserPicURL} />
          <div className='commentInfo'>
            <CommentInfo CommentTime={this.state.CommentTime}/>
          </div>
        </div>
        <CommentInput />
      </div>
    );
  }
}

export default Comment;
