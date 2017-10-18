import React from 'react';
import {Link} from 'react-router-dom';

class Shortcut extends React.Component {
  render() {
    return (
      <section className="shortcut">
        <h1>shortcut</h1>
        <Link className="shortcut-btn" to="/">Framer</Link>
        <Link className="shortcut-btn" to="/">Ochrasy</Link>
        <Link className="shortcut-btn" to="/">Mr.Moon</Link>
        <Link className="shortcut-btn" to="/">Josephine</Link>
      </section>
    );
  }
}

export default Shortcut;

