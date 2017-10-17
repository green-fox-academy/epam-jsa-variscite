'use strict';

import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import Post from '../../components/Post';
import Comment from '../../components/Comment';
import AddPost from '../../components/AddPost';

class FeedPage extends React.Component {
  render() {
    return (
      <div>
        <Header isLoggedIn={true}/>
        <main className="container">
          <AddPost />
          <Post />
          <Comment />
        </main>
      </div>
    );
  }
}

export default FeedPage;
