import React from 'react';
import './style.scss';
import CommentInfo from '../CommentInfo/';
import CommentInput from '../CommentInput/';

class Comment extends React.Component {
  render() {
    return (
      <div className="comment-container">
        <div className="comment-box">
          <img className="user-pic" src={this.props.userPicURL} />
          <div className="comment-info">
            <CommentInfo
              commentTime={this.props.commentTime}
              commentUsername={this.props.username}
              commentText={this.props.commentText}
            />
          </div>
        </div>
        {/* <CommentInput myPicURL={this.props.myPicURL} /> */}
        {this.props.inputBoxState === true ? <CommentInput myPicURL={this.props.myPicURL} /> : null}
      </div>
    );
  }
}

Comment.defaultProps = {
  username: 'Hillary Clinton',
  commentTime: '10th Oct at 11:42PM',
  userPicURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9HKJuqE3ZmpAWaWHEbFAvsCsktkwEFZ-aNKy9eo1VGvTh_hE',
  myPicURL: 'https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg',
  commentText: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
};

export default Comment;
