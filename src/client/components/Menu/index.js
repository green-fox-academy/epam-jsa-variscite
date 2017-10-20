import React from 'react';

class OtherOptions extends React.Component {
  render() {
    let list = ['Create Page', 'Create Group', 'Your Group', 'Preferences', 'Settings', 'Log out'];

    return (
      <div className="menu-container">
        <div className="arrow"></div>
        <ul className="menu">
          <li>{list[0]}</li>
          <li>{list[1]}</li>
          <li>{list[2]}</li>
          <li>{list[3]}</li>
          <li>{list[4]}</li>
          <li>{list[5]}</li>
        </ul>
      </div>

    );
  }
}

export default OtherOptions;
