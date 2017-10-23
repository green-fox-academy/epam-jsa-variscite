import React from 'react';
const badRequest = 400;

class OtherOptions extends React.Component {
  handleLogoutError(status, response) {
    if (status === badRequest) {
      return;
    }
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  logout() {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.handleLogoutError(xhr.status, xhr.response);
      }
    }.bind(this));
    xhr.open('DELETE', '/api/login');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
  }
  render() {
    /* eslint no-magic-numbers: ["error", { "ignoreArrayIndexes": true }]*/ 
    let list = [
      'Create Page',
      'Create Group',
      'Your Group',
      'Preferences',
      'Settings',
      'Log out',
    ];

    return (
      <div className="menu-container">
        <div className="arrow"></div>
        <ul className="menu">
          <li className="menu-option">{list[0]}</li>
          <li className="menu-option">{list[1]}</li>
          <li className="menu-option">{list[2]}</li>
          <li className="menu-option">{list[3]}</li>
          <li className="menu-option">{list[4]}</li>
          <li className="menu-option" onClick={function() {
            this.logout();
          }.bind(this)}>{list[5]}</li>
        </ul>
      </div>
    );
  }
}

export default OtherOptions;
