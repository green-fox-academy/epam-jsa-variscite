'use strict';

import React from 'react';

class Intro extends React.Component {
  render() {
    return (
      <div className="profile-intro">
        <div className="intro">Intro</div>
        <div className="info">
          <div className="text">Full Name: <a href="/profile">Donald Trump</a></div>
          <div className="text">Gender: <span>Male</span></div>
          <div className="text">Age: <span>71</span></div>
          <div className="text">Lives in <a href="https://en.wikipedia.org/wiki/Washington,_D.C.">Washington D.C., United States</a></div>
          <div className="text">Works at <a href="https://www.usa.gov/">United States Government</a></div>
          <div className="text">Studied at <a href="https://www.wharton.upenn.edu/">The Wharton School, University of Pennsylvania</a></div>
        </div>
        <div className="album">Album</div>
        <div className="img-container">
          <img src="http://static6.businessinsider.com/image/55918b77ecad04a3465a0a63/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg" />
        </div>
      </div>
    );
  }
}

export default Intro;
