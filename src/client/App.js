import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginPage from './screens/Login';
import FeedPage from './screens/Feed';
import SignupPage from './screens/Signup';
import ProfilePage from './screens/Profile';
import './style.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tokenExists: localStorage.getItem('token') !== null};
  }

  render() {
    if (this.state.tokenExists) {
      return (
        <Router>
          <div>
            <Route exact path="/" component={LoginPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/feed" component={FeedPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/profile" component={ProfilePage} />
          </div>
        </Router>
      );
    }
    return (
      <Router>
        <Switch>
          <Route path="/signup" component={SignupPage} />
          <Route component={LoginPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
