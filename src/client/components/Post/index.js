import React from 'react';
import './style.scss';
import PostHeader from '../PostHeader/';
import PostInfo from '../PostInfo/';
import PostAct from '../PostAct/';

class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="post-container">
        <section className="post-box">
          <PostHeader userInfo={this.props.item} />
          <p className="post-text">{this.props.item.postText}</p>
          <img className="post-pic" src={this.props.item.postPicURL} />
          <PostInfo postInfo={this.props.item}/>
          <PostAct showInput = {() => this.props.showInput()}/>
        </section>
      </div>
    );
  }
}

export default Post;
