'use strict';

import React from 'react';
import PostAndComment from '../PostAndComment';
import HTTP_STATUSES from '../../httpStatuses';
import formatDate from '../../components/Module/formatDate';

const MIN_LEN = 2;

class ProfilePost extends React.Component {
  constructor(props) {
    super(props);
    console.log('props on construct: ', props);
    this.state = {
      'username': props.user,
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
    if (this.props.isSelf) {
      xhr.open('GET', '/api/post?author=me');
    } else {
      xhr.open('GET', '/api/post?username=' + this.state.username);
    }
    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleGetPostError(xhr.status)) {
          let posts = JSON.parse(xhr.response).post;
          console.log(posts);
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
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
  }

  componentDidMount() {
    console.log('did mount props: ', this.props);
    this.getAllPosts();
    // this.getUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({username: nextProps.user}, function() {
        console.log('callback', this.state.username);
    });
    // console.log('will receive, next value: ', nextProps.user);
    // console.log('will receive, current value: ', this.props.user);
    this.getAllPosts();
  }

  render() {
    console.log('on render: ', this.props);
    let postsToRender = this.state.posts;

    postsToRender = postsToRender.map((item, key) =>
      <PostAndComment item={item} key={key}
        myName={this.props.myName}
        increaseCommentNum = {() => this.getAllPosts()} />
    );

    return (
      <div className="profile-post">
        {postsToRender}
      </div>
    );
  }
}

export default ProfilePost;
