import React from 'react';
import {Link} from 'react-router-dom';

class Explore extends React.Component {
  render() {
    return (
      <section className="explore">
        <h1>explore</h1>
        <Link className="music" to="/" onClick={(e) => e.preventDefault()}>Music</Link>
        <Link className="events" to="/" onClick={(e) => e.preventDefault()}>Events</Link>
        <Link className="pages" to="/" onClick={(e) => e.preventDefault()}>Pages</Link>
        <Link className="games" to="/" onClick={(e) => e.preventDefault()}>Games</Link>
        <Link className="thisday" to="/" onClick={(e) => e.preventDefault()}>On this day</Link>
      </section>
    );
  }
}

export default Explore;

