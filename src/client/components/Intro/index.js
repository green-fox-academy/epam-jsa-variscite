'use strict';

import React from 'react';

class Intro extends React.Component {
  render() {
    return (
      <div className="profile-intro">
        <div className="intro">Intro</div>
        <p>Full Name: <span>Chase</span></p>
        <p>Gender: <span>Male</span></p>
        <p>Age: <span>24</span></p>
        <p>Lives in <span>London, United Kindom</span></p>
        <p>Works at <span>EPAM System</span></p>
        <p>Studied at <span>University of Oxford</span></p>
      </div>
    );
  }
}

export default Intro;
