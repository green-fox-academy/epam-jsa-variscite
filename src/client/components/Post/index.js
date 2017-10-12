import React from 'react';
// import './index.scss';

var url = src="https://fb-s-d-a.akamaihd.net/h-ak-fbx/v/t1.0-1/c0.0.80.80/p80x80/10155010_614520631958093_2235754017819729660_n.jpg?oh=9418d4151dad7e8776a0fbdd705c7c94&oe=5A7AA8EC&__gda__=1517155317_d61b0a07fdad04b7e7bb6d1e3ef24cc0";
class Post extends React.Component {
  render() {
    return (
      <main className='PostBox'>
        <img src={url}/>
        <p>Username</p>
        <p>time</p>
        <p>Lorem ipsum</p>
        <img>
      </main>
    );
  }
}

export default Post;
