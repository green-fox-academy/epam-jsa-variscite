'use strict';

import React from 'react';
import {Link} from 'react-router-dom';

class Intro extends React.Component {
  render() {
    return (
      <div className="profile-intro">
        <h1 className="intro">Intro</h1>
        <div className="info">
          <div className="text">Full Name: <Link to="/profile">{this.props.user}</Link></div>
          <div className="text">Gender: <span></span></div>
          <div className="text">Age: <span></span></div>
          <div className="text">Lives in <a href="#"></a></div>
          <div className="text">Works at <a href="#"></a></div>
          <div className="text">Studied at <a href="#"></a></div>
        </div>
        <h1 className="album">Album</h1>
        <div className="img-container">
          <img src="https://upload.wikimedia.org/wikipedia/en/5/54/Public_image_ltd_album_cover.jpg" />
        </div>
      </div>
    );
  }
}

export default Intro;
