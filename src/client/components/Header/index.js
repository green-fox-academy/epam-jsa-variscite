import React from 'react';
import Logo from '../Logo';
import SearchBar from '../SearchBar';
import OtherOptions from '../OtherOptions';
import './style.scss';
import HTTP_STATUSES from '../../httpStatuses';

class Header extends React.Component {
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
    // this.setState({'errorMessage': errorMessage});
    this.props.getErrorMessage(errorMessage);
    return false;
  }

  sendSearchRequest(data) {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (this.handleSearchError(xhr.status)) {
          let peopleInfo = JSON.parse(xhr.response).people;

          // this.setState({'peopleInfo': peopleInfo});
          this.props.getPeopleInfo(peopleInfo);
          window.location.href('/search');
        }
      }
    }.bind(this));
    xhr.open('GET', '/api/search/' + this.props.searchType + '/' + data);
    console.log(this.props.searchType);
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
  // //////////////////////////////////////////////////////////////////////

  render() {
    if (this.props.isLoggedIn === true) {
      return (
        <header className="logged-in-header">
          <Logo
            isLoggedIn={this.props.isLoggedIn}
            user={this.props.user}
          />
          <SearchBar onSubmit={this.search.bind(this)}
            searchType={this.props.searchType}/>
          <OtherOptions show = {() => this.props.show()} />
        </header>
      );
    }
    return (
      <header className="guest-header">
        <Logo />
      </header>
    );
  }
}

export default Header;
