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
    
    this.setState({posts:[{
      username: 'Donald Trump',
      postText: 'Make America great again! #America #greatwall',
      postTime: '10th Oct at 8:12PM',
      userPicURL: 'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/05/12/104466932-PE_Color.240x240.jpg?v=1494613853',
      postPicURL: 'http://ronpaulinstitute.org/media/121032/donald-trumps-mexico-border-wall-557313.jpg',
      numOfLikes: 248,
      numOfComments: 36,
      numOfShares: 192,
    }]});
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
