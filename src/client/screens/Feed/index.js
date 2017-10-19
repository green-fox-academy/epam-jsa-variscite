'use strict';

import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import Post from '../../components/Post';
import Comment from '../../components/Comment';
import AddPost from '../../components/AddPost';
import HTTP_STATUSES from '../../httpStatuses';
import NavigationBar from '../../components/NavigationBar';
const MIN_LEN = 2;

class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'posts': [],
      'errorMessage': null,
    };
  }

  handleGetPostError(state) {
    let errorMessage = null;

    if (status === HTTP_STATUSES.BAD_REQUEST) {
      errorMessage = 'Something went wrong, please try later!';
      this.setState({'errorMessage': errorMessage});
    } else if (status === HTTP_STATUSES.UNAUTHORIZED) {
      errorMessage = 'You are not authorized! Please log in first!';
    } else if (status === HTTP_STATUSES.SERVER_ERROR) {
      errorMessage = 'Cannot connect to the database, please try again later!';
      this.setState({'errorMessage': errorMessage});
    }
  }

  getAllPosts() {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.token;

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.handleGetPostError(xhr.state);
        let posts = JSON.parse(xhr.response);
        let currentPost = this.state.posts;

        posts.forEach(currentPost.push(posts));
        this.setState(currentPost);
      }
    }.bind(this));
    xhr.open('GET', '/api/post');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
    this.setState({posts:[{
    	username: 'Donald Trump',
    	postText: 'Make America great again! #America #greatwall',
       postTime: '10th Oct at 8:12PM',
       userPicURL: 'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/05/12/104466932-PE_Color.240x240.jpg?v=1494613853',
       postPicURL: 'http://ronpaulinstitute.org/media/121032/donald-trumps-mexico-border-wall-557313.jpg',
       numOfLikes: 248,
       numOfComments: 36,
       numOfShares: 192,
    }]});
  }

  handleOnload(event) {
    this.getAllPosts();
  }

  post(event) {
    event.preventDefault();
    let postContent = {content: event.target.elements.namedItem('input').value};

    if (postContent.content.length > MIN_LEN) {
      this.sendPost(postContent);
    } else {
      this.setState({'errorMessage': 'Please enter more words!'});
    }
  }

  handlePostError(status) {
    let errorMessage = null;

    if (status === HTTP_STATUSES.BAD_REQUEST) {
      errorMessage = 'Something went wrong, please try later!';
      this.setState({'errorMessage': errorMessage});
    } else if (status === HTTP_STATUSES.UNAUTHORIZED) {
      errorMessage = 'You are not authorized! Please log in first!';
      this.setState({'errorMessage': errorMessage});
    } else if (status === HTTP_STATUSES.SERVER_ERROR) {
      errorMessage = 'Cannot connect to the database, please try again later!';
      this.setState({'errorMessage': errorMessage});
    }
  }

  sendPost(data) {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.token;

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.setState({'errorMessage': null});
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

    postsToRender = postsToRender.map(function(item, key) {
      return (
        <Post item={item} key={item.postId}/>
      );
    });
    return (
      <div>
        <Header isLoggedIn={true}/>
        <NavigationBar />
        <main className="container" onLoad={this.handleOnload.bind(this)}>
          <AddPost
            errorMessage={this.state.errorMessage}
            onSubmit={this.post.bind(this)}
          />
          {postsToRender}
          <Comment />
        </main>
      </div>
    );
  }
}

export default FeedPage;
