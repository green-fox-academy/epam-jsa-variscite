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
          this.props.increaseCommentNum();
        }
      }
    }.bind(this));
    xhr.open('POST', '/api/post/' + this.props.postId + '/comment');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send(JSON.stringify(data));
  }

  keyPressHandler(event) {
    if (event.charCode === ENTER_KEY_CODE && !event.shiftKey) {
      event.preventDefault();
      this.addComment(event);
    }
  }

  textareaOnfocus(state) {
    if (state === true) {
      this.nameInput.focus();
    }
  }

  componentDidMount() {
    this.textareaOnfocus(this.props.isInputBoxDisplay);
  }

  render() {
    return (
      <div className="comment-input">
        <img className="user-pic" src={this.props.myPicURL} />
        <textarea onKeyPress={this.keyPressHandler.bind(this)}
          id="comment-input" required name="input" placeholder="Write a comment" ref={(input) => {
            this.nameInput = input;
          }}></textarea>
        <button></button>
      </div>
    );
  }
}

export default CommentInput;
