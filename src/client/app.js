'use strict';

const ReactDOM = require('react-dom'); // eslint-disable-line no-unused-vars
const React = require('react');
// eslint-disable-next-line no-unused-vars
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginPage from './pages/login/index.js';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={LoginPage} />
          <Route path='/login' component={LoginPage} />
        </div>
      </Router>
    );
  }
}

export default App;
