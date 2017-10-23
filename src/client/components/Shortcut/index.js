import React from 'react';
import {Link} from 'react-router-dom';

class Shortcut extends React.Component {
  render() {
    return (
      <section className="shortcut">
        <h1>shortcut</h1>
        <Link className="shortcut-btn" to="/" onClick={e => e.preventDefault()}>Framer</Link>
        <Link className="shortcut-btn" to="/" onClick={e => e.preventDefault()}>Ochrasy</Link>
        <Link className="shortcut-btn" to="/" onClick={e => e.preventDefault()}>Mr.Moon</Link>
        <Link className="shortcut-btn" to="/" onClick={e => e.preventDefault()}>Josephine</Link>
      </section>
    );
  }
}

export default Shortcut;

