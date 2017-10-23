import React from 'react';
import './style.scss';
import CommentInput from '../CommentInput/';
import CommentsBox from '../CommentsBox/';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
        // {
        //   commentText: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
        //   likes: [],
        //   postId: '',
        //   replys: [],
        //   timeStamp: '10th Oct at 11:42PM',
        //   userId: '',
        //   userPicURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9HKJuqE3ZmpAWaWHEbFAvsCsktkwEFZ-aNKy9eo1VGvTh_hE',
        //   username: 'Hillary Clinton',
        // },
      ],
      errorMessage: null,
      myPicURL: 'https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg',
    };
  }

  handleGetCommentError(status) {
    console.log('oo');
  }
  getComments(value) {
    this.state.comments.push(value);
    console.log(this.state.comments);
  }

  getAllComments() {
    let xhr = new XMLHttpRequest();
    // let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        // if (this.handleGetCommentError(xhr.status)) {
        if (true) {
          console.log('xhr: ', xhr.response);
          let comments = JSON.parse(xhr.response);

          // comments.reverse(comments.timeStamp);
          // comments = comments.map(function(item, index) {
          //   let newDate = new Date(item.timeStamp);

          //   item.timeInDate = formatDate(newDate);
          //   return item;
          // });

          this.setState({comments: comments});
        }
      }
    }.bind(this));
    xhr.open('GET', '/api/post/' + this.props.post_id + '/comment');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
  }

  componentDidMount() {
    this.getAllComments();
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
          <CommentInput getCommentsInfo={this.getAllComments.bind(this)} post_id={this.props.post_id}
            myPicURL={this.state.myPicURL} /> : null}
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
