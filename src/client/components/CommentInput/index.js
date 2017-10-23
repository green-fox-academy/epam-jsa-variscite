'use strict';

import React from 'react';
const MIN_LEN = 2;
const ENTER_KEY_CODE = 13;

class CommentInput extends React.Component {
  constructor(props) {
    super(props);
  }

  addComment(event) {
    event.preventDefault();
    console.log(this.props.post_id);
    let commentContent = {
      text: event.target.elements.namedItem('input').value,
      _id: this.props.post_id,
    };

    if (commentContent.text.length > MIN_LEN) {
      this.sendComment(commentContent);
      event.target.elements.namedItem('input').value = '';
    } else {
      this.setState({'errorMessage': 'Please enter more words!'});
    }
  }

  sendComment(data) {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.handleCommentError(xhr.status);
      }
    }.bind(this));
    xhr.open('POST', '/api/comment');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send(JSON.stringify(data));
  }

  handleCommentError(status) {
    console.log('good');
  }

  componentDidMount() {
    document.getElementById('comment-input'). addEventListener('keypress', function(e) {
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
        <textarea id="comment-input" required name="input" placeholder="post a comment"></textarea>
        <button></button>
      </div>
    );
  }
}

export default CommentInput;
