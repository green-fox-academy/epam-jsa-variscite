import React from 'react';

class OtherOptions extends React.Component {
  render() {
    return (
      <div className="otherOptions">
        <button className="settingButton imgButton"></button>
        <button className="mysteryButton imgButton"></button>
        <button className="friendsButton">Friends</button>
        <button className="homeButton">Home</button>
      </div>
    );
  }
}

export default OtherOptions;
