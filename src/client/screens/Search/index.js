'use strict';

import './style.scss';
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import SearchNav from '../../components/SearchNav';
import SearchPeople from '../../components/SearchPeople';
import SearchPost from '../../components/SearchPost';
import HTTP_STATUSES from '../../httpStatuses';
import formatDate from '../../components/Module/formatDate';
/* eslint no-magic-numbers: ["error", { "ignoreArrayIndexes": true }]*/
class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    let searchArray = window.location.search.split('?')[1]
      .split('&').map(function(querySetting) {
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
      'searchInfo': [],
      'errorMessage': null,
    };
  }
  componentWillReceiveProps() {
    let searchArray = window.location.search.split('?')[1]
      .split('&').map(function(querySetting) {
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

  handleSearchError(status) {
    let errorMessage = 'aaa';

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
  formatTimeStamp(array) {
    array.reverse(array.timeStamp);
    array = array.map(function(item, index) {
      let newDate = new Date(item.timeStamp);
      let newOriginDate = new Date(item.originTimeStamp);

      item.timeInDate = formatDate(newDate);
      item.originTimeInDate = formatDate(newOriginDate);
      return item;
    });
  }
  sendSearchRequest() {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleSearchError(xhr.status)) {
          let searchInfo = [];

          if (this.state.searchType === 'people') {
            searchInfo = JSON.parse(xhr.response).people;
          } else if (this.state.searchType === 'posts') {
            searchInfo = JSON.parse(xhr.response).post;
            this.formatTimeStamp(searchInfo);
          }
          if (searchInfo.length === 0) {
            this.setState({'searchInfo': null});
          } else {
            this.setState({'searchInfo': searchInfo});
          }
        }
      }
    }.bind(this));

    xhr.open('GET', '/api/search/' + this.state.searchType +
    '/' + this.state.searchText);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(this.state.searchText));
  }

  componentDidMount() {
    this.getUserInfo();
    this.sendSearchRequest();
  }
  render() {
    let main = null;

    if (this.state.errorMessage !== null) {
      main = <h1 className="no-result">{this.state.errorMessage}</h1>;
    } else if (this.state.searchInfo === null) {
      main = <h1 className="no-result">Sorry, we couldn't find anything.</h1>;
    } else if (this.state.searchType === 'posts' &&
     this.state.searchInfo.length !== 0) {
      main = <SearchPost postsInfo={this.state.searchInfo} />;
    } else if (this.state.searchType === 'people' &&
    this.state.searchInfo.length !== 0) {
      main = <SearchPeople peopleInfo={this.state.searchInfo} />;
    }

    return (
      <div>
        <Header isLoggedIn={true}
          user={this.state.userInfo.username}
          searchType={this.state.searchType} />
        <SearchNav searchType= {this.state.searchType}
          query={this.state.searchText} />
        {main}
      </div>
    );
  }
}

export default SearchPage;
