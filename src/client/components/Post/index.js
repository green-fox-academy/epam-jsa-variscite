import React from 'react';
import './style.scss';
import PostHeader from '../PostHeader/';
import PostInfo from '../PostInfo/';
import PostAct from '../PostAct/';

class Post extends React.Component {
  render() {
    return (
      <div className='postContainer'>
        <section className='postBox'>
          <PostHeader />
          <p className='postText'>Make America great again! #America #greatwall</p>
          <img className='postPic' src='http://ronpaulinstitute.org/media/121032/donald-trumps-mexico-border-wall-557313.jpg' />
          <PostInfo />
          <PostAct />
        </section>
      </div>
    );
  }
}

export default Post;
