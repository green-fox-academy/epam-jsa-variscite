'use strict';

import React from 'react';
import formatDate from '../../components/Module/formatDate';
import HTTP_STATUSES from '../../httpStatuses';
const MIN_LEN = 2;
const ENTER_KEY_CODE = 13;

class CommentInput extends React.Component {
  constructor(props) {
    super(props);
  }

  addComment(event) {
    event.preventDefault();
    let commentContent = {
      text: event.target.value,
      _id: this.props.post_id,
    };

    if (commentContent.text.length > MIN_LEN) {
      this.sendComment(commentContent);
      event.target.value = '';
    } else {
      alert('more words needed!');
    }
  }

  handleCommentError(status) {
    let errorMessage = null;

    if (status === HTTP_STATUSES.BAD_REQUEST) {
      errorMessage = 'Something went wrong, please try later!';
      return false;
    } else if (status === HTTP_STATUSES.SERVER_ERROR) {
      errorMessage = 'Cannot connect to the database, please try again later!';
      return false;
    } else if (status === HTTP_STATUSES.CREATED) {
      return true;
    }
  }

  sendComment(data) {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleCommentError(xhr.status)) {
          let comments = JSON.parse(xhr.response);

          console.log(comments);

          // comments.reverse(comments.timeStamp);
          // comments = comments.map(function(item, index) {
          //   let newDate = new Date(item.timeStamp);

          //   item.timeInDate = formatDate(newDate);
          //   return item;
          // });
          this.props.getCommentsInfo();
        }
      }
    }.bind(this));
    xhr.open('POST', '/api/comment');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send(JSON.stringify(data));
  }

  componentDidMount() {
    document.getElementById('comment-input').addEventListener('keypress', function(e) {
      if (e.keyCode == ENTER_KEY_CODE && !e.shiftKey) {
        e.preventDefault();
        this.addComment(e);
      }
    }.bind(this));
  }

  render() {
    return (
      <div className="comment-input">
        <img className="user-pic" src={this.props.myPicURL} />
        <textarea id="comment-input" required name="input" placeholder="Post a comment"></textarea>
        <button></button>
      </div>
    );
  }
}

export default CommentInput;
