import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import FeedPage from './screens/feed';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={FeedPage} />
          <Route path="/feed" component={FeedPage} />
        </div>
      </Router>
    );
  }
}

export default App;
