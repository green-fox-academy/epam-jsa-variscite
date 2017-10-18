'use strict';

import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import Post from '../../components/Post';
import Comment from '../../components/Comment';
import AddPost from '../../components/AddPost';

class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  getAllPosts() {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.token;

    xhr.addEventListener('readystatechange', function() {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        let posts = JSON.parse(xhr.response).posts;
        let currentPost = this.state.posts;
        currentPost.push(posts);
        this.setState(currentPost);
      }
    }.bind(this));
    xhr.open('GET', '/api/post');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
  }

  handleOnload(event){
    this.getAllPosts();
  }

  render() {
    var postsToRender = this.state.posts;
  		postsToRender = postsToRender.map(function(item, key){
  			return (
  				<Post item={item} key={key}/>
  			);
  		}.bind(this));
    return (
      <div>
        <Header isLoggedIn={true}/>
        <main className="container" onLoad={this.handleOnload.bind(this)}>
          <AddPost />
          {postsToRender}
          <Comment />
        </main>
      </div>
    );
  }
}

export default FeedPage;
