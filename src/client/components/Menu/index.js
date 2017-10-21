import React from 'react';

class OtherOptions extends React.Component {
  constructor(props) {
    super(props);
  }
  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
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
