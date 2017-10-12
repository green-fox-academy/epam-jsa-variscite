import React from 'react';

class PostInfo extends React.Component {
  render() {
    return (
      <div className='postInfo'>
        <p className='likes'>192 likes</p>
        <p>18 comments</p>
        <p>102 shares</p>
      </div>
    );
  }
}

export default PostInfo;
