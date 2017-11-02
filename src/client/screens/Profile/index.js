'use strict';

import './style.scss';
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import ProfileNav from '../../components/ProfileNav';
import ProfileMain from '../../components/ProfileMain';
import HTTP_STATUSES from '../../httpStatuses';
import Upload from 'antd/lib/upload';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'userInfo': {username: ''},
      'isLoggedIn': true,
      'profileImgURL': '',
      'profileName': {username: ''},
      'isSelf': true,
      'isFriend': false,
      'errorMessage': null,
    };
    this.handleProfileImgSubmit = this.handleProfileImgSubmit.bind(this);
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
    } else if (status === HTTP_STATUSES.BAD_REQUEST) {
      errorMessage = 'Sorry, No Such User!';
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

  addFriend(event) {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleGetUserInfoError(xhr.status)) {
          this.setState({isFriend: true});
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

  getSignedRequest(file) {
    return fetch(`/sign-s3?fileName=${file.name}&fileType=${file.type}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      });
  }
  uploadFile(binaryFile, signedRequest, url) {
    const options = {
      method: 'PUT',
      body: binaryFile,
    };

    return fetch(signedRequest, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return url;
      });
  }
  uploadToS3(file) {
    return this.getSignedRequest(file)
      .then((json) => this.uploadFile(file, json.signedRequest, json.url))
      .then((url) => url).catch((err) => {
        console.error(err);
        return null;
      });
  }
  handleProfileImgSubmit(file) {
    this.uploadToS3(file.file)
      .then((url) => {
        this.setProfileImg(url);
      });
  }
  openProfileDialog() {
    document.querySelector('.upload-profile-dialog .ant-upload input').click();
  }

  handlesetProfileImgInfoError() {
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

  setProfileImg(imgURL) {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handlesetProfileImgInfoError(xhr.status)) {
          this.getUserInfo();
        }
      }
    }.bind(this));
    xhr.open('POST', '/api/profile');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send(JSON.stringify({'imgURL': imgURL}));
  }

  render() {
    const profileProps = {
      action: '/',
      customRequest: this.handleProfileImgSubmit,
    };

    return (
      <div>
        <Header isLoggedIn={true}
          user={this.state.userInfo.username} />
        <div className="photo-container">
          <img className="cover-photo"
            src="http://www.hdfbcover.com/randomcovers/covers/Great-minds-think-alone.jpg" />
          <img className="user-pic"
            src={this.state.profileName.userPicURL}
            onClick={this.openProfileDialog} />
          {this.state.isSelf !== true && this.state.isFriend === false ? <button className="add-friend"
            onClick={this.addFriend.bind(this)}> Add
          </button> : null}
          <Upload {...profileProps} className="upload-profile-dialog">
            <div>upload</div>
          </Upload>
          <ProfileNav />
        </div>
        <ProfileMain myName={this.state.userInfo.username} user={this.state.profileName.username} isSelf={this.state.isSelf}
          userInfo={this.state.userInfo}/>
      </div>
    );
  }
}

export default ProfilePage;
