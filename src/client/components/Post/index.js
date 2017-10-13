import React from 'react';
import './style.scss';
import PostHeader from '../PostHeader/';
import PostInfo from '../PostInfo/';
import PostAct from '../PostAct/';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: 'Donald Trump',
      PostText: 'Make America great again! #America #greatwall',
      PostTime: '10th Oct at 8:12PM',
      UserPicURL: 'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/05/12/104466932-PE_Color.240x240.jpg?v=1494613853',
      PostPicURL: 'http://ronpaulinstitute.org/media/121032/donald-trumps-mexico-border-wall-557313.jpg',
      NumOfLikes: 248,
      NumOfComments: 36,
      NumOfShares: 192,
    };
  }
  render() {
    return (
      <div className='postContainer'>
        <section className='postBox'>
          <PostHeader UserInfo={this.state} />
          <p className='postText'>{this.state.PostText}</p>
          <img className='postPic' src={this.state.PostPicURL} />
          <PostInfo PostInfo={this.state}/>
          <PostAct />
        </section>
      </div>
    );
  }
}

export default Post;
