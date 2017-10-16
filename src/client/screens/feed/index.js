'use strict';

import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import Post from '../../components/Post';

class FeedPage extends React.Component {
  render() {
    return (
      <div>
        <Header isLoggedIn={true}/>
        <Post />
      </div>
    );
  }
}

export default FeedPage;
