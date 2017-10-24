'use strict';

import React from 'react';
import HTTP_STATUSES from '../../httpStatuses';
const MIN_LEN = 2;
const ENTER_KEY_CODE = 13;

class CommentInput extends React.Component {
  addComment(event) {
    event.preventDefault();
    let commentContent = {
      text: event.target.value,
      userPicURL: this.props.myPicURL, //
    };

    if (commentContent.text.length > MIN_LEN) {
      this.sendComment(commentContent);
      event.target.value = '';
    }
  }

  handleCommentError(status) {
    let errorMessage = null;

    if (status === HTTP_STATUSES.BAD_REQUEST) {
      errorMessage = 'Something went wrong, please try later!';
      return errorMessage;
    } else if (status === HTTP_STATUSES.SERVER_ERROR) {
      errorMessage = 'Cannot connect to the database, please try again later!';
      return errorMessage;
    } else if (status === HTTP_STATUSES.UNAUTHORIZED) {
      errorMessage = 'You are not authorized, please log in first!';
    } else if (status === HTTP_STATUSES.CREATED) {
      return true;
    }
  }

  sendComment(data) {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleCommentError(xhr.status) === true) {
          this.props.getCommentsInfo();
        }
      }
    }.bind(this));
    console.log(this.props.postId);
    xhr.open('POST', '/api/post/' + this.props.postId + '/comment');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send(JSON.stringify(data));
  }

  // componentDidMount() {
  //   document.getElementById('comment-input').addEventListener('keypress', function(e) {
  //     if (e.keyCode == ENTER_KEY_CODE && !e.shiftKey) {
  //       e.preventDefault();
  //       this.addComment(e);
  //     }
  //   }.bind(this));
  // }

  keyPressHandler(event) {
    if (event.charCode === ENTER_KEY_CODE && !event.shiftKey) {
      event.preventDefault();
      this.addComment(event);
    }
  }

  render() {
    return (
      <div className="comment-input">
        <img className="user-pic" src={this.props.myPicURL} />
        <textarea onKeyPress={this.keyPressHandler.bind(this)}
          id="comment-input" required name="input"
          placeholder="Post a comment"></textarea>
        <button></button>
      </div>
    );
  }
}

export default CommentInput;
