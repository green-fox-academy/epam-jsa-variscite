import React from 'react';
import './style.scss';
import CommentInfo from '../CommentInfo/';
import CommentInput from '../CommentInput/';

class Comment extends React.Component {
  constructor(props){
    super(props);
    this.CommentInfo = {
      Username: 'Hillary Clinton',
      CommentTime: '10th Oct at 11:42PM',
      UserPicURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9HKJuqE3ZmpAWaWHEbFAvsCsktkwEFZ-aNKy9eo1VGvTh_hE',
      MyPicURL: 'https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg',
    };
  }
  render() {
    return (
      <div className='commentContainer'>
        <div className='commentBox'>
          <img className='userPic' src={this.CommentInfo.UserPicURL} />
          <div className='commentInfo'>
            <CommentInfo CommentTime={this.CommentInfo.CommentTime} CommentUsername={this.CommentInfo.Username}/>
          </div>
        </div>
        <CommentInput MyPicURL={this.CommentInfo.MyPicURL} />
      </div>
    );
  }
}

export default Comment;
