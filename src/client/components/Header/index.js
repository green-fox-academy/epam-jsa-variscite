import React from 'react';
import Logo from '../Logo';
import SearchBar from '../SearchBar';
import OtherOptions from '../OtherOptions';
import './style1.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isLoggedIn === true) {
      return (
        <header className="logged-in-header">
          <Logo />
          <SearchBar />
          <OtherOptions show = {() => this.props.show()}/>
        </header>
      );
    }
    return (
      <header className="guest-header">
        <Logo isLoggedIn={this.props.isLoggedIn} />
      </header>
    );
  }
}

export default Header;
