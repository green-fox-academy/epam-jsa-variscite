import React from 'react';

class Explore extends React.Component {
  render() {
    return (
      <div className="explore">
        <h1>explore</h1>       
          <button className="music"><p>Music</p></button>
          <button className="events"><p>Events</p></button>
          <button className="pages"><p>Pages</p></button>
          <button className="games"><p>Games</p></button>
          <button className="thisday"><p>On this day</p></button>
      </div>
    );
  }
}

export default Explore;

