import React from 'react';

class Logo extends React.Component {
  render() {
    if (this.props.isLoggedIn === true) {
      return (
        <div className="logo-field">
          <button>V</button>
          <a>UserName</a>
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
