import React from 'react';
import Header from './components/Header';

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
