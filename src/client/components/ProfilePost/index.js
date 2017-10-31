'use strict';

import React from 'react';
import PostAndComment from '../PostAndComment';
import AddPost from '../AddPost';
import HTTP_STATUSES from '../../httpStatuses';
import formatDate from '../../components/Module/formatDate';

const MIN_LEN = 2;

class ProfilePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'posts': [],
      'errorMessage': null,
    };
  }

  handleGetPostError(status) {
    let errorMessage = null;
    let pass = true;

    if (status === HTTP_STATUSES.UNAUTHORIZED) {
      window.location.href = '/login';
      pass = false;
      errorMessage = 'You are not authorized! Please log in first!';
    } else if (status === HTTP_STATUSES.SERVER_ERROR) {
      pass = false;
      errorMessage = 'Cannot connect to the database, please try again later!';
    }
    this.setState({'errorMessage': errorMessage});
    return pass;
  }

  getAllPosts() {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleGetPostError(xhr.status)) {
          let posts = JSON.parse(xhr.response).post;

          posts.reverse(posts.timeStamp);
          posts = posts.map(function(item, index) {
            let newDate = new Date(item.timeStamp);

            item.timeInDate = formatDate(newDate);
            return item;
          });
          this.setState({posts: posts});
        }
      }
    }.bind(this));
    xhr.open('GET', '/api/post?author=me');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
  }

  componentDidMount() {
    this.getAllPosts();
    // this.getUserInfo();
  }

  addPost(event) {
    event.preventDefault();

    let postContent = {postText: event.target.elements.namedItem('input').value};

    if (postContent.postText.length > MIN_LEN) {
      this.sendPost(postContent);
      event.target.elements.namedItem('input').value = '';
    } else {
      this.setState({'errorMessage': 'Please enter more words!'});
    }
  }

  handlePostError(status) {
    let errorMessage = null;

    if (status === HTTP_STATUSES.BAD_REQUEST) {
      errorMessage = 'Something went wrong, please try later!';
    } else if (status === HTTP_STATUSES.UNAUTHORIZED) {
      window.location.href = '/login';
      errorMessage = 'You are not authorized! Please log in first!';
    } else if (status === HTTP_STATUSES.SERVER_ERROR) {
      errorMessage = 'Cannot connect to the database, please try again later!';
    } else {
      this.getAllPosts();
    }
    this.setState({'errorMessage': errorMessage});
  }

  sendPost(data) {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.handlePostError(xhr.status);
      }
    }.bind(this));
    xhr.open('POST', '/api/post');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send(JSON.stringify(data));
  }

  render() {
    let postsToRender = this.state.posts;

    postsToRender = postsToRender.map((item, key) =>
      <PostAndComment item={item} key={key}
        myName={this.props.myName}
        increaseCommentNum = {() => this.getAllPosts()} />
    );

    return (
      <div className="profile-post">
        <AddPost errorMessage={this.state.errorMessage}
          onSubmit={this.addPost.bind(this)}/>
        {postsToRender}
      </div>
    );
  }
}

export default ProfilePost;
