'use strict';

import React from 'react';

class Intro extends React.Component {
  render() {
    return (
      <div className="profile-intro">
        <div className="intro">Intro</div>
        <div className="info">
          <div className="text">Full Name: <a href="#">Chase Wang</a></div>
          <div className="text">Gender: <a href="#">Male</a></div>
          <div className="text">Age: <a href="#">24</a></div>
          <div className="text">Lives in <a href="#">London, United Kindom</a></div>
          <div className="text">Works at <a href="#">EPAM System</a></div>
          <div className="text">Studied at <a href="#">University of Oxford</a></div>
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
