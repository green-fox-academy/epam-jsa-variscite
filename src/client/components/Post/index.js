import React from 'react';
import './style.scss';
import PostHeader from '../PostHeader/';
import PostInfo from '../PostInfo/';
import PostAct from '../PostAct/';

class Post extends React.Component {
  render() {
    return (
      <div className="post-container">
        <section className="post-box">
          <PostHeader userInfo={this.props} />
          <p className="post-text">{this.props.postText}</p>
          <img className="post-pic" src={this.props.postPicURL} />
          <PostInfo postInfo={this.props}/>
          <PostAct />
        </section>
      </div>
    );
  }
}

Post.defaultProps = {
  username: 'Donald Trump',
  postText: 'Make America great again! #America #greatwall',
  postTime: '10th Oct at 8:12PM',
  userPicURL: 'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/05/12/104466932-PE_Color.240x240.jpg?v=1494613853',
  postPicURL: 'http://ronpaulinstitute.org/media/121032/donald-trumps-mexico-border-wall-557313.jpg',
  numOfLikes: 248,
  numOfComments: 36,
  numOfShares: 192,
};

export default Post;
