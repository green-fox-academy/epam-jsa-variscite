import React from 'react';
import './style.scss';
import PostHeader from '../PostHeader/';
import PostInfo from '../PostInfo/';
import PostAct from '../PostAct/';
import HTTP_STATUSES from '../../httpStatuses';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfLikes: this.props.item.numOfLikes,
      errorMessage: null,
      likeState: 'like',
    };
  }

  handleErrorLike(xhr) {
    if (xhr.status === HTTP_STATUSES.OK) {
      let datas = xhr.response.toString().split(' ');
      let numLikes = datas[0].split('\"');
      let likeClass = datas[1].split('\"');
      
      this.setState({numOfLikes: numLikes[1]});
      this.setState({likeState: likeClass[0]});
    } else if (xhr.status === HTTP_STATUSES.UNAUTHORIZED) {
      this.setState(
        {errorMessage: 'Sorry, you are not authorized, please log in first!'}
      );
    } else {
      this.setState(
        {errorMessage: 'Sorry, Server Error! Please try again later!'}
      );
    }
  }

  like(event) {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.getItem('token');

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.handleErrorLike(xhr);
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
          <PostInfo
            numOfLikes={this.state.numOfLikes}
            postInfo={this.props.item}
          />
          {this.state.errorMessage !== null ? <span className="error">
            {this.state.errorMessage}</span> : null}
          <PostAct
            onLikeClick={this.like.bind(this)}
            likeStatus={this.state.likeState}
          />
        </section>
      </div>
    );
  }
}

export default Post;
