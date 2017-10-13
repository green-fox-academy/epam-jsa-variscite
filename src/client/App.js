import React from 'react';
import Header from './components/Header';
import Post from './components/Post';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header isLoggedIn={true}/>
        <Post />
      </div>
    );
  }
}

export default App;
