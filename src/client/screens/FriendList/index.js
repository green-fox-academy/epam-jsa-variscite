'use strict';

import './style.scss';
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import ProfileNav from '../../components/ProfileNav';
import FriendNav from '../../components/FriendNav';
import FriendInfo from '../../components/FriendInfo';
import HTTP_STATUSES from '../../httpStatuses';

class FriendListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'userInfo': {username: ''},
      'isLoggedIn': true,
      'friendsInfo': [],
    };
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

  getUserInfo() {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleGetUserInfoError(xhr.status)) {
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

  handleGetFriendsInfoError(status) {
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

  getFriendsInfo() {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleGetFriendsInfoError(xhr.status)) {
          let friendsInfo = JSON.parse(xhr.response).friends;

          this.setState({friendsInfo: friendsInfo});
        }
      }
    }.bind(this));
    xhr.open('GET', '/api/friend');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
  }

  componentDidMount() {
    this.getUserInfo();
    this.getFriendsInfo();
  }
  render() {
    let friendsToRender = this.state.friendsInfo;

    friendsToRender = friendsToRender.map((item, key) => (
      <FriendInfo key={key} item={item}/>
    ));
    return (
      <div>
        <Header isLoggedIn={true} user={this.state.userInfo.username} />
        <div className="photo-container">
          <img className="cover-photo" src="http://www.hdfbcover.com/randomcovers/covers/Great-minds-think-alone.jpg"/>
          <img className="user-pic" src="https://www.nbr.co.nz/sites/default/files/blog_post_img/Trump-impact_0.jpg" />
          <ProfileNav />
          <FriendNav />
          <div className="friend-list">
            {friendsToRender}

            {friendsToRender}
            {friendsToRender}
          </div>
        </div>
      </div>
    );
  }
}

export default FriendListPage;
