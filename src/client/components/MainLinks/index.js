import React from 'react';

class MainLinks extends React.Component {
  render() {
    return (
      <div>
        <button className="home"></button>
        <a>Home</a>
        <button className="friends"></button>
        <a>Friends</a>
        <button className="news"></button>
        <a>News Feed</a>
      </div>
    );
  }
}

export default MainLinks;
