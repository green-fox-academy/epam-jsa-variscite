import React from 'react';
import Header from './components/Header';
import ReactDOM from 'react-dom';
const React = require('react');
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Signup from './screens/SignupScreen/index.js';


class App extends React.Component {
  render() {
    return (
      <div>
        <Header isLoggedIn={true}/>
      </div>
    );
  }
}

export default App;

