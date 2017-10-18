import React from 'react';
import {Link} from 'react-router-dom';

class Explore extends React.Component {
  render() {
    return (
      <section className="explore">
        <h1>explore</h1>
        <Link className="music" to="/">Music</Link>
        <Link className="events" to="/">Events</Link>
        <Link className="pages" to="/">Pages</Link>
        <Link className="games" to="/">Games</Link>
        <Link className="thisday" to="/">On this day</Link>
      </section>
    );
  }
}

export default Explore;

