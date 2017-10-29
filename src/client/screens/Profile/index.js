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
      'searchType': 'people',
      'peopleInfo': [
        {username: 'Obama', userPicURL: 'https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg'},
        {username: 'Hillary', userPicURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9HKJuqE3ZmpAWaWHEbFAvsCsktkwEFZ-aNKy9eo1VGvTh_hE'},
      ],
      'errorMessage': null,
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
  // ////////
  handleSearchError(status) {
    let errorMessage = null;

    if (status === HTTP_STATUSES.BAD_REQUEST) {
      errorMessage = 'Something went wrong, please try later!';
    } else if (status === HTTP_STATUSES.UNAUTHORIZED) {
      window.location.href = '/login';
      errorMessage = 'You are not authorized! Please log in first!';
    } else if (status === HTTP_STATUSES.SERVER_ERROR) {
      errorMessage = 'Cannot connect to the database, please try again later!';
    } else if (status === HTTP_STATUSES.OK) {
      return true;
    }
    this.setState({'errorMessage': errorMessage});
    return false;
  }

  sendSearchRequest(data) {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleSearchError(xhr.status)) {
          let peopleInfo = JSON.parse(xhr.response).people;

          this.setState({'peopleInfo': peopleInfo});
          window.location.href = '/search';
        }
      }
    }.bind(this));
    xhr.open('GET', '/api/search/' + this.state.searchType + '/' + data);
    console.log(this.state.searchType);
    console.log(data);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
  }

  search(event) {
    event.preventDefault();

    let searchText = event.target.elements.namedItem('input').value;

    if (searchText !== null) {
      this.sendSearchRequest(searchText);
      event.target.elements.namedItem('input').value = '';
    } else {
      this.setState({'errorMessage': 'Please fill out thi field!'});
    }
  }

  // ////

  componentDidMount() {
    this.getUserInfo();
  }
  render() {
    return (
      <div>
        <Header isLoggedIn={true}
          user={this.state.userInfo.username}
          onSubmit={this.search.bind(this)}
          searchType={this.state.searchType} />
        <div className="photo-container">
          <img className="cover-photo" src="http://www.hdfbcover.com/randomcovers/covers/Great-minds-think-alone.jpg"/>
          <img className="user-pic" src="https://www.nbr.co.nz/sites/default/files/blog_post_img/Trump-impact_0.jpg" />
          <ProfileNav />
        </div>
        <ProfileMain user={this.state.userInfo.username} />
      </div>
    );
  }
}

export default ProfilePage;
