'use strict';

import React from 'react';
import PostAndComment from '../PostAndComment';
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
    if (this.props.isSelf) {
      xhr.open('GET', '/api/post?author=me');
    } else {
      xhr.open('GET', '/api/post?username=' + this.props.user);
    }
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
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
  }

  componentDidMount() {
    this.getAllPosts();
    // this.getUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    this.getAllPosts();
  }

  render() {
    let postsToRender = this.state.posts;

    postsToRender = postsToRender.map((item, key) =>
      <PostAndComment item={item} key={key}/>
    );

    return (
      <div className="profile-post">
        {postsToRender}
      </div>
    );
  }
}

export default ProfilePost;
