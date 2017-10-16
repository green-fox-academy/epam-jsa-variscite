'use strict';

import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import AddPost from '../../components/AddPost';

class FeedPage extends React.Component {
  render() {
    return (
      <div>
        <Header isLoggedIn={true}/>
        <main className="container">
          <AddPost />
        </main>
      </div>
    );
  }
}

export default FeedPage;
