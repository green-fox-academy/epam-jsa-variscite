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
          <PostHeader UserInfo={this.props.PostInfo} />
          <p className='postText'>{this.props.PostInfo.PostText}</p>
          <img className='postPic' src={this.props.PostInfo.PostPicURL} />
          <PostInfo PostInfo={this.props.PostInfo}/>
          <PostAct />
        </section>
      </div>
    );
  }
}

export default Post;
