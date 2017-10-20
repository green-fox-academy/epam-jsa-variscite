'use strict';

import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import NavigationBar from '../../components/NavigationBar';

class FeedPage extends React.Component {
  render() {
    return (
      <div className="body">
        <Header isLoggedIn={true} show = {() => this.handleOpen()} />
        <NavigationBar />
      </div>
    );
  }
}

export default FeedPage;
