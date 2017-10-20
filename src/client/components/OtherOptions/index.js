import React from 'react';

class OtherOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  openState() {
    this.props.show();
  }

  // closeState() {
  //   this.props.hidden();
  // }

  render() {
    return (
      <div className="other-options">
        <button className="home-button">Home</button>
        <button className="friends-button">Friends</button>
        <button className="mystery-button img-button"></button>
        <button className="setting-button img-button" onClick={function() {
          this.openState();
        }.bind(this)}></button>
      </div>
    );
  }
}

export default OtherOptions;
