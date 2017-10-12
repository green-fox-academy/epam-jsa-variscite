import React from 'react';

class Logo extends React.Component {
  render() {
    if (this.props.isLoggedIn === true) {
      return (
        <div className="logoField">
          <button>V</button>
          <a>UserName</a>
        </div>
      );
    } else {
      return (
        <div className="logoField">
          <button>V</button>
          <a>Variscite</a>
        </div>
      );
    }
  }
}

export default Logo;
