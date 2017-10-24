import React from 'react';
import {Link} from 'react-router-dom';

class MainLinks extends React.Component {
  render() {
    return (
      <section className="main-links">
        <h1>good evening</h1>
        <Link className="home" to="/home">Home</Link>
        <Link className="friends" to="/friends">Friends</Link>
        <Link className="news" to="/feed">News Feed</Link>
      </section>
    );
  }
}

export default MainLinks;
