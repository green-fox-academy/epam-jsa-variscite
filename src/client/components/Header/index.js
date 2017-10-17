import React from 'react';
import Logo from '../Logo';
import SearchBar from '../SearchBar';
import OtherOptions from '../OtherOptions';
import './style.scss';

class Header extends React.Component {
  render() {
    if (this.props.isLoggedIn === true) {
      return (
        <header className="loggedInHeader">
          <Logo />
          <SearchBar />
          <OtherOptions />
        </header>
      );
    } else {
      return (
        <header className="guestHeader">
          <Logo isLoggedIn={this.props.isLoggedIn} />
        </header>
      );
    }
  }
}

export default Header;
