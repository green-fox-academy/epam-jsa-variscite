import React from 'react';

class PostInfo extends React.Component {
  render() {
    return (
      <div className='postInfo'>
        <span className='likes'>192 likes</span>
        <span>18 comments</span>
        <span>102 shares</span>
      </div>
    );
  }
}

export default PostInfo;
