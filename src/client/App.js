import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginPage from './screens/login';
import FeedPage from './screens/feed';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={LoginPage} />
          <Route path='/login' component={LoginPage} />
          <Route path="/feed" component={FeedPage} />
        </div>
      </Router>
    );
  }
}

export default App;
