import React from 'react';
import Logo from '../Logo';
import SearchBar from '../SearchBar';
import OtherOptions from '../OtherOptions';
import './style.scss';

class Header extends React.Component {
  render() {
    if (this.props.isLoggedIn === true) {
      return (
        <header className="logged-in-header">
          <Logo
            isLoggedIn={this.props.isLoggedIn}
            user={this.props.user}
          />
          <SearchBar searchType={this.props.searchType}/>
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
