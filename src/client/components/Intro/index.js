'use strict';

import React from 'react';

class Intro extends React.Component {
  render() {
    return (
      <div className="profile-intro">
        <div className="intro">Intro</div>
        <div className="info">
          <div className="text">Full Name: <a href="/profile">Chase Wang</a></div>
          <div className="text">Gender: <span>Male</span></div>
          <div className="text">Age: <span>24</span></div>
          <div className="text">Lives in <a href="https://en.wikipedia.org/wiki/London">London, United Kindom</a></div>
          <div className="text">Works at <a href="https://www.epam.com/">EPAM System</a></div>
          <div className="text">Studied at <a href="https://www.cass.city.ac.uk/">Cass Business School</a></div>
        </div>
        <div className="album">Album</div>
        <div className="img-container">
          <img src="http://cdn4.spiegel.de/images/image-2953-640_panofree-rejo-2953.jpg" />
        </div>
      </div>
    );
  }
}

export default Intro;
