import React from 'react';
import Header from './components/Header';
import Comment from './components/Comment';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header isLoggedIn={true}/>
        <Comment />
      </div>
    );
  }
}

export default App;
