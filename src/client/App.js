import ReactDOM from 'react-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Signup from './screens/SignupScreen/index.js';

import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Signup} />
          <Route path='/signup' component={Signup} />
        </div>
      </Router>
    );
  }
}
 

export default App;
