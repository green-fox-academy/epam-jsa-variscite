import React from 'react';

class MainLinks extends React.Component {
  render() {
    return (
      <div className="mainlinks">
        <div>
          <button className="home"></button>
          <a>Home</a>
        </div>
        <div>
          <button className="friends"></button>
          <a>Friends</a>
        </div>
        <div>
          <button className="news"></button>
          <a>News Feed</a>
        </div>
      </div>
    );
  }
}

export default MainLinks;
