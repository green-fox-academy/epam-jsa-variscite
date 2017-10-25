import React from 'react';
import {Link} from 'react-router-dom';

class MainLinks extends React.Component {
  render() {
    return (
      <section className="main-links">
        <h1>good evening</h1>
        <Link className="home" to="/home" onClick={(e) => e.preventDefault()}>Home</Link>
        <Link className="friends" to="/friends" onClick={(e) => e.preventDefault()}>Friends</Link>
        <Link className="news" to="/feed" onClick={(e) => e.preventDefault()}>News Feed</Link>
      </section>
    );
  }
}

export default MainLinks;
