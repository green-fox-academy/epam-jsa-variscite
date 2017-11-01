'use strict';

import './style.scss';
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import PostAndComment from '../../components/PostAndComment';
import AddPost from '../../components/AddPost';
import HTTP_STATUSES from '../../httpStatuses';
import NavigationBar from '../../components/NavigationBar';
import SuggestedPage from '../../components/SuggestedPage';
import formatDate from '../../components/Module/formatDate';
const MIN_LEN = 2;

class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'posts': [],
      'errorMessage': null,
      'userInfo': {username: 'Obama'},
      'isLoggedIn': true,
      'isSharing': false,
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

  handleGetUserInfoError(status) {
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

          this.formatTimeStamp(posts);
          this.setState({posts: posts});
        }
      }
    }.bind(this));
    xhr.open('GET', '/api/post');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
  }

  formatTimeStamp(array) {
    array.reverse(array.timeStamp);
    array = array.map(function(item, index) {
      let newDate = new Date(item.timeStamp);
      let newOriginDate = new Date(item.originTimeStamp);

      item.timeInDate = formatDate(newDate);
      item.originTimeInDate = formatDate(newOriginDate);
      return item;
    });
  }

  getUserInfo() {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleGetPostError(xhr.status)) {
          let userInfo = JSON.parse(xhr.response).info;

          this.setState({userInfo: userInfo});
        }
      }
    }.bind(this));
    xhr.open('GET', '/api/user');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
  }

  componentDidMount() {
    this.getAllPosts();
    this.getUserInfo();
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

  share(event, item) {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.handleErrorShare(xhr);
      }
    }.bind(this));
    xhr.open('PUT', '/api/post/' + item._id + '/share');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    this.setState({isSharing: true});
    xhr.send(null);
  }

  handleErrorShare(xhr) {
    if (xhr.status === HTTP_STATUSES.OK) {
      let posts = JSON.parse(xhr.response).post;

      this.formatTimeStamp(posts);
      this.setState({posts: posts, isSharing: false});
    } else if (xhr.status === HTTP_STATUSES.UNAUTHORIZED) {
      this.setState(
        {errorMessage: 'Sorry, you are not authorized, please log in first!'}
      );
    } else {
      this.setState(
        {errorMessage: 'Sorry, Server Error! Please try again later!'}
      );
    }
  }

  handleErrorDelete(xhr, _id) {
    if (xhr.status === HTTP_STATUSES.OK) {
      let newPosts = this.state.posts;

      newPosts.splice(this.state.posts.map(function(post) {
        return post._id;
      }).indexOf(_id), 1);
      this.setState({posts: newPosts});
    } else if (xhr.status === HTTP_STATUSES.UNAUTHORIZED) {
      this.setState(
        {errorMessage: 'Sorry, you are not authorized, please log in first!'}
      );
    } else {
      this.setState(
        {errorMessage: 'Sorry, Server Error! Please try again later!'}
      );
    }
  }

  deletePost(event, item) {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.handleErrorDelete(xhr, item._id);
      }
    }.bind(this));
    let query = (typeof item.username !== 'string') ? '?sharedByUser=' + item.username[0] : '';

    xhr.open('DELETE', '/api/post/' + item._id + query);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
  }

  render() {
    let postsToRender = this.state.posts;

    postsToRender = postsToRender.map((item, key) => (
      <PostAndComment key={key} item={item}
        onShareClick={() => {
          this.share(event, item);
        }}
        isSharing={this.state.isSharing}
        myName={this.state.userInfo.username}
        deletePost={() => {
          this.deletePost(event, item);
        }}
        increaseCommentNum = {() => this.getAllPosts()}
      />

    ));
    return (
      <div>
        <Header isLoggedIn={this.state.isLoggedIn}
          user={this.state.userInfo.username}
        />
        <div className="feed-page-container">
          <NavigationBar />
          <main className="container">
            <AddPost
              errorMessage={this.state.errorMessage}
              onSubmit={this.addPost.bind(this)}
            />
            {postsToRender}
          </main>
          <SuggestedPage />
        </div>
      </div>
    );
  }
}

export default FeedPage;
