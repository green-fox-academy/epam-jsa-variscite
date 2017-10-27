import React from 'react';

class Logo extends React.Component {
  render() {
    if (this.props.isLoggedIn === true) {
      return (
        <div className="logo-field">
          <button onClick={function() {
            window.location.href = '/feed';
          }}>V</button>
          <a href="/profile">{this.props.user}</a>
        </div>
      );
    }
    return (
      <div className="logo-field">
        <button>V</button>
        <a>Variscite</a>
      </div>
    );
  }
}

export default Logo;
