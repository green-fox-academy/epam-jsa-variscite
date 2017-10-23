import React from 'react';
import './style.scss';
import PostHeader from '../PostHeader/';
import PostInfo from '../PostInfo/';
import PostAct from '../PostAct/';

class Post extends React.Component {
  like(event) {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');
    let uName;

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        uName = this.props.item.username;
      }
    }.bind(this));
    xhr.open('PUT', '/api/post/' + this.props.item._id + '/like');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send(uName);
  }

  render() {
    return (
      <div className="post-container">
        <section className="post-box">
          <PostHeader userInfo={this.props.item} />
          <p className="post-text">{this.props.item.postText}</p>
          <img className="post-pic" src={this.props.item.postPicURL} />
          <PostInfo postInfo={this.props.item}/>
          <PostAct onClick={this.like.bind(this)} />
        </section>
      </div>
    );
  }
}

export default Post;
