import React from 'react';

class Explore extends React.Component {
  render() {
    return (
      <div className="explore">
        <h1>EXPLORE</h1>
        <div>
          <button className="music"></button>
          <a>Music</a>
        </div>
        <div>
          <button className="events"></button>
          <a>Events</a>
        </div>
        <div>
          <button className="pages"></button>
          <a>Pages</a>
        </div>
        <div>
          <button className="games"></button>
          <a>Games</a>
        </div>
        <div>
          <button className="thisday"></button>
          <a>On this day</a>
        </div>
      </div>
    );
  }
}

export default Explore;

