'use strict';

import './style.scss';
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import SearchNav from '../../components/SearchNav';
import SearchPeople from '../../components/SearchPeople';
import SearchPost from '../../components/SearchPost';
import HTTP_STATUSES from '../../httpStatuses';

class SearchPage extends React.Component {
  constructor(props) {
    console.log('aaa');
    super(props);
    let searchArray = window.location.search.split('?')[1].split('&').map(function(querySetting) {
      return querySetting.split('=');
    });

    let searchObj = searchArray.reduce(function(pre, cur) {
      pre[cur[0]] = cur[1];
      return pre;
    }, {});

    this.state = {
      'searchText': searchObj.q,
      'userInfo': {username: ''},
      'isLoggedIn': true,
      'searchType': searchObj.type === undefined ? 'people' : searchObj.type,
      'searchInfo': [
        // {username: 'Obama', userPicURL: 'https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg'},
        // {username: 'Hillary', userPicURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9HKJuqE3ZmpAWaWHEbFAvsCsktkwEFZ-aNKy9eo1VGvTh_hE'},
      ],
      'errorMessage': null,
    };
  }
  componentWillReceiveProps() {
    let searchArray = window.location.search.split('?')[1].split('&').map(function(querySetting) {
      return querySetting.split('=');
    });

    let searchObj = searchArray.reduce(function(pre, cur) {
      pre[cur[0]] = cur[1];
      return pre;
    }, {});

    this.setState({
      'searchInfo': [],
      'searchType': searchObj.type,
      'searchText': searchObj.q,
    }, function() {
      console.log('state: ', this.state.searchType);
      this.sendSearchRequest();
    }.bind(this));
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

  // ///////////////////////////////////////
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

  sendSearchRequest() {
    console.log(this.state.searchText);
    console.log(this.state.searchType);
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleSearchError(xhr.status)) {
          let searchInfo = [];

          if (this.state.searchType === 'people') {
            searchInfo = JSON.parse(xhr.response).people;
          } else if (this.state.searchType === 'posts') {
            searchInfo = JSON.parse(xhr.response).post;
            console.log('from backend: ', searchInfo);
          }

          this.setState({'searchInfo': searchInfo});
          // console.log(this.state.searchInfo);
        }
      }
    }.bind(this));
    console.log('text: ', this.state.searchText);
    console.log('type: ', this.state.searchType);

    xhr.open('GET', '/api/search/' + this.state.searchType + '/' + this.state.searchText);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(this.state.searchText));
  }

  componentDidMount() {
    this.getUserInfo();
    this.sendSearchRequest();

    // let obj = {};

    // searchArray.forEach(function(data) {
    //   obj[data[0]] = data[1];
    // });
  }

  // /////////////////////////////////////////////////////////////
  render() {
    let main = null;

    if (this.state.searchType === 'posts') {
      main = <SearchPost postsInfo={this.state.searchInfo} />;
    } else if (this.state.searchType === 'people') {
      main = <SearchPeople peopleInfo={this.state.searchInfo} />;
    }
    return (
      <div>
        <Header isLoggedIn={true}
          user={this.state.userInfo.username}
          searchType={this.state.searchType} />
        <SearchNav query={this.state.searchText} />
        {main}
      </div>
    );
  }
}

export default SearchPage;
