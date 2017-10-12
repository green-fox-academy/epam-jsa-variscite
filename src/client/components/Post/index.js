import React from 'react';
import './style.scss';
import PostHeader from '../PostHeader/';
import PostInfo from '../PostInfo/';
import PostAct from '../PostAct/';

class Post extends React.Component {
  render() {
    return (
      <div className='postContainer'>
        <main className='postBox'>
          <PostHeader />
          <p className='postText'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</p>
          <img className='postPic' src='https://fb-s-b-a.akamaihd.net/h-ak-fbx/v/t31.0-8/981699_614520911958065_621055260817408593_o.jpg?oh=32b13d341441699c05d16dfa69e04abb&oe=5A806D0F&__gda__=1518039321_65071f83d0dca5478896402ca4d80411' />
          <PostInfo />
          <PostAct />
        </main>
      </div>
    );
  }
}

export default Post;
