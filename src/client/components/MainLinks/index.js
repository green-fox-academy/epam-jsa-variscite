import React from 'react';

class MainLinks extends React.Component {
  render() {
    return (
      <div className="mainlinks">
        <h1>good evening</h1>
          <button className="home"><p>Home</p></button>
          <button className="friends"><p>Friends</p></button>
          <button className="news"><p>News Feed</p></button>
      </div>
    );
  }
}

export default MainLinks;
