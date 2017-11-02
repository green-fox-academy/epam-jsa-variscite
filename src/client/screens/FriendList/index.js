'use strict';

import './style.scss';
import React from 'react';
import Header from '../../components/Header';
import ProfileNav from '../../components/ProfileNav';
import FriendNav from '../../components/FriendNav';
import FriendInfo from '../../components/FriendInfo';
import HTTP_STATUSES from '../../httpStatuses';
import Loader from 'halogen/ScaleLoader';

class FriendListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'userInfo': {username: ''},
      'isLoggedIn': true,
      'friendsInfo': [],
      'isLoading': false,
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
          this.setState({userInfo: JSON.parse(xhr.response).info});
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
    this.setState({'errorMessage': errorMessage, 'isLoading': false});
    return pass;
  }

  getFriendsInfo() {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    this.setState({isLoading: true});
    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleGetFriendsInfoError(xhr.status)) {
          this.setState({friendsInfo: JSON.parse(xhr.response).friends, isLoading: false});
        }
      }
    }.bind(this));
    xhr.open('GET', '/api/friend');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
  }

  handleUnfriendError(xhr, friendId) {
    if (xhr.status === HTTP_STATUSES.OK) {
      let newFriendsInfo = this.state.friendsInfo;

      newFriendsInfo.splice(this.state.friendsInfo.map(function(friend) {
        return friend._id;
      }).indexOf(friendId), 1);
      this.setState({friendsInfo: newFriendsInfo});
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

  unfriend(event, friendId) {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.handleUnfriendError(xhr, friendId);
      }
    }.bind(this));
    xhr.open('DELETE', '/api/friend/' + friendId);
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
      <FriendInfo key={key} item={item}
        userPicURL={item.userPicURL}
        onUnfriendClick={() => {
          this.unfriend(event, item._id);
        }}/>
    ));

    let content = null;

    if (this.state.isLoading) {
      content = <Loader color="#4a90e2" className="friend-loader"/>;
    } else if (friendsToRender.length === 0) {
      content = <p className="no-friend">Start adding more friends!</p>;
    } else {
      content = null;
    }

    return (
      <div>
        <Header isLoggedIn={true} user={this.state.userInfo.username} />
        <div className="photo-container">
          <img className="cover-photo" src="http://www.hdfbcover.com/randomcovers/covers/Great-minds-think-alone.jpg"/>
          <img className="user-pic-friend" src={this.state.userInfo.userPicURL} />
          <ProfileNav />
          <FriendNav />
          <div className="friend-list">
            {content}
            {friendsToRender}
          </div>
        </div>
      </div>
    );
  }
}

export default FriendListPage;
