import React from 'react';
import './style.scss';
import PostHeader from '../PostHeader/';
import PostInfo from '../PostInfo/';
import PostAct from '../PostAct/';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfLikes: this.props.item.numOfLikes,
    }
  }
  like(event) {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.setState({numOfLikes: xhr.response})
      }
    }.bind(this));
    xhr.open('PUT', '/api/post/' + this.props.item._id + '/like');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send(null);
  }

  render() {
    return (
      <div className="post-container">
        <section className="post-box">
          <PostHeader userInfo={this.props.item} />
          <p className="post-text">{this.props.item.postText}</p>
          <img className="post-pic" src={this.props.item.postPicURL} />
          <PostInfo numOfLikes={this.state.numOfLikes} postInfo={this.props.item}/>
          <PostAct onClick={this.like.bind(this)} />
        </section>
      </div>
    );
  }
}

export default Post;
