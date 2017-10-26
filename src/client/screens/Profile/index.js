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

  componentDidMount() {
    this.getUserInfo();
  }
  render() {
    return (
      <div>
        <Header isLoggedIn={true} user={this.state.userInfo.username} />
        <div className="photo-container">
          <img className="cover-photo" src="http://www.hdfbcover.com/randomcovers/covers/Great-minds-think-alone.jpg"/>
          <img className="user-pic" src="https://www.nbr.co.nz/sites/default/files/blog_post_img/Trump-impact_0.jpg" />
          <ProfileNav />
        </div>
        <ProfileMain />
      </div>
    );
  }
}

export default ProfilePage;
