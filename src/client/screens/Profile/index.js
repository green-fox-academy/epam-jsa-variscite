'use strict';

import './style.scss';
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import ProfileNav from '../../components/ProfileNav';
import ProfileMain from '../../components/ProfileMain';
import HTTP_STATUSES from '../../httpStatuses';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'userInfo': {username: ''},
      'isLoggedIn': true,
      'profileName': {username: ''},
      'isSelf': true,
      'isFriend': false,
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
    return;
  }

  getProfileInfo() {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');
    if (window.location.href.split('?')[1] !== undefined) {
      let profileName = window.location.href.split('?')[1].split('=')[1];
      this.setState({isSelf: false});
      xhr.open('GET', '/api/user?username=' + profileName);
    } else {
      xhr.open('GET', '/api/user');
    }
    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleGetUserInfoError(xhr.status)) {
          let profileName = JSON.parse(xhr.response).info;

          this.setState({profileName: profileName, isFriend: profileName.isFriend});
        }
      }
    }.bind(this));
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
    return;
  }

  addFriend(event){
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleGetUserInfoError(xhr.status)) {
          this.setState({isFriend:true});
        }
      }
    }.bind(this));
    xhr.open('PUT', '/api/friend/' + this.state.profileName.username);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
  }

  componentDidMount() {
    this.getUserInfo();
    this.getProfileInfo();
  }

  render() {
    return (
      <div>
        <Header isLoggedIn={true} user={this.state.userInfo.username} />
        <div className="photo-container">
          <img className="cover-photo" src="http://www.hdfbcover.com/randomcovers/covers/Great-minds-think-alone.jpg"/>
          <img className="user-pic" src="https://www.nbr.co.nz/sites/default/files/blog_post_img/Trump-impact_0.jpg" />
          {this.state.isSelf !== true && this.state.isFriend === false ? <button className="add-friend"
          onClick={this.addFriend.bind(this)}> Add
          </button> : null}
          <ProfileNav />
        </div>
        <ProfileMain user={this.state.profileName.username} isSelf={this.state.isSelf} />
      </div>
    );
  }
}

export default ProfilePage;
