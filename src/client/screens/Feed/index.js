'use strict';

import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import Comment from '../../components/Comment'

class FeedPage extends React.Component {
  render() {
    return (
      <div>
        <Header isLoggedIn={true}/>
        <Comment />
      </div>
    );
  }
}

export default FeedPage;
