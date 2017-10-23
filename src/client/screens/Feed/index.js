'use strict';

import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import PostComment from '../../components/PostComment';
import AddPost from '../../components/AddPost';
import HTTP_STATUSES from '../../httpStatuses';
import NavigationBar from '../../components/NavigationBar';
const MIN_LEN = 2;

class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'posts': [
        {
          '_id': '1',
          'username': 'Donald Trump',
          'postText': 'Make America great again! #America #greatwall',
          'timeStamp': 1508469350963,
          'userPicURL': 'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/05/12/104466932-PE_Color.240x240.jpg?v=1494613853',
          'postPicURL': 'http://ronpaulinstitute.org/media/121032/donald-trumps-mexico-border-wall-557313.jpg',
          'numOfLikes': 248,
          'numOfComments': 36,
          'numOfShares': 192,
        }, {
          '_id': '2',
          'username': 'Donald Trump',
          'timeStamp': 1508469350963,
          'postText': 'Make America great again! #America #greatwall',
          'userPicURL': 'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/05/12/104466932-PE_Color.240x240.jpg?v=1494613853',
          'postPicURL': 'http://ronpaulinstitute.org/media/121032/donald-trumps-mexico-border-wall-557313.jpg',
          'numOfLikes': 248,
          'numOfComments': 36,
          'numOfShares': 192,
        },
      ],
      'errorMessage': null,
      'isCommentDispaly': false,
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

            item.timeStamp = newDate.toString();
            return item;
          });

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

  componentDidMount() {
    this.getAllPosts();
  }

  addPost(event) {
    event.preventDefault();
    let postContent = {
      postText: event.target.elements
        .namedItem('input').value,
    };

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

    postsToRender = postsToRender.map(function(item, key) {
      return (
        <PostComment item={item}/>
      );
    });
    return (
      <div>
        <Header isLoggedIn={true} show = {() => this.handleOpen()} />
        <NavigationBar />
        <main className="container">
          <AddPost
            errorMessage={this.state.errorMessage}
            onSubmit={this.addPost.bind(this)}
          />
          {postsToRender}
        </main>
      </div>
    );
  }
}

export default FeedPage;
