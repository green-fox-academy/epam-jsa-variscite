import React from 'react';
import './index.scss';
import CommentInfo from '../CommentInfo/';
import CommentInput from '../CommentInput/';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.CommentInfo = {
      username: 'Hillary Clinton',
      commentTime: '10th Oct at 11:42PM',
      userPicURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9HKJuqE3ZmpAWaWHEbFAvsCsktkwEFZ-aNKy9eo1VGvTh_hE',
      myPicURL: 'https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg',
    };
  }
  render() {
    return (
      <div className="comment-container">
        <div className="comment-box">
          <img className="user-pic" src={this.CommentInfo.userPicURL} />
          <div className="comment-info">
            <CommentInfo
              commentTime={this.CommentInfo.commentTime}
              commentUsername={this.CommentInfo.username}
            />
          </div>
        </div>
        <CommentInput myPicURL={this.CommentInfo.myPicURL} />
      </div>
    );
  }
}

export default Comment;
