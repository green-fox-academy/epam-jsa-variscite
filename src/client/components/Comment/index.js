import React from 'react';
import './style.scss';
import CommentInput from '../CommentInput/';
import CommentsBox from '../CommentsBox/';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
        {
          commentText: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
          likes: [],
          postId: '',
          replys: [],
          timeStamp: '10th Oct at 11:42PM',
          userId: '',
          userPicURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9HKJuqE3ZmpAWaWHEbFAvsCsktkwEFZ-aNKy9eo1VGvTh_hE',
          username: 'Hillary Clinton',
          // myPicURL: 'https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg',
        },
      ],
      errorMessage: null,
    };
  }

  getComments(value) {
    this.state.comments.push(value);
    console.log(this.state.comments);
  }

  render() {
    let commentsToRender = this.state.comments;

    commentsToRender = commentsToRender.map(function(item, key) {
      return (
        <CommentsBox item={item}/>
      );
    });

    return (
      <div className="comment-container">
        {commentsToRender}
        {this.props.inputBoxState === true ?
          <CommentInput getCommentsInfo={this.getComments.bind(this)} post_id={this.props.post_id}
            myPicURL={this.state.comments[0].myPicURL} /> : null}
      </div>
    );
  }
}

// Comment.defaultProps = {
//   username: 'Hillary Clinton',
//   commentTime: '10th Oct at 11:42PM',
//   userPicURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9HKJuqE3ZmpAWaWHEbFAvsCsktkwEFZ-aNKy9eo1VGvTh_hE',
//   myPicURL: 'https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg',
//   commentText: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
// };

export default Comment;
