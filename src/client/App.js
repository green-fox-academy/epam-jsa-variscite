import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginPage from './pages/login';
import MainPage from './pages/mainpage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ifRedirect: false,
    };
    this.handler = this.handler.bind(this);
  }

  handler() {
    this.setState({ifRedirect: true});
  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={LoginPage} />
          <Route exact path="/feed" component={MainPage} />
        </div>
      </Router>
    );
  }
}

export default App;
