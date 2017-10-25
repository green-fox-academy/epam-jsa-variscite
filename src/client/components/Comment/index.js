import React from 'react';
import './style.scss';
import CommentInput from '../CommentInput/';
import CommentsBox from '../CommentsBox/';
import formatDate from '../../components/Module/formatDate';
import HTTP_STATUSES from '../../httpStatuses';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      errorMessage: null,
      myPicURL: 'https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg',
    };
  }

  handleGetCommentError(status) {
    if (status === HTTP_STATUSES.BAD_REQUEST) {
      this.setState({errorMessage: 'Something went wrong, please try again later!'});
      return false;
    } else if (status === HTTP_STATUSES.UNAUTHORIZED) {
      this.setState({errorMessage: 'You are not authorized, please log in first!'});
      return false;
    } else if (status === HTTP_STATUSES.SERVER_ERROR) {
      this.setState({errorMessage: 'Server error, please try again later!'});
      return false;
    } else if (status === HTTP_STATUSES.OK) {
      return true;
    }
  }

  getAllComments() {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleGetCommentError(xhr.status)) {
          let comments = JSON.parse(xhr.response);

          comments = comments.map(function(item, index) {
            let newDate = new Date(item.timeStamp);

            item.timeStamp = formatDate(newDate);
            return item;
          });

          this.setState({comments: comments});
        }
      }
    }.bind(this));
    xhr.open('GET', '/api/post/' + this.props.postId + '/comment');
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
        <CommentsBox item={item} key={key}/>
      );
    });

    return (
      <div className="comment-container">
        {commentsToRender}
        {this.props.isInputBoxDisplay === true ?
          <CommentInput getCommentsInfo={this.getAllComments.bind(this)}
            postId={this.props.postId} myPicURL={this.state.myPicURL}
            isInputBoxDisplay={this.props.isInputBoxDisplay}/> : null}
      </div>
    );
  }
}

export default Comment;
