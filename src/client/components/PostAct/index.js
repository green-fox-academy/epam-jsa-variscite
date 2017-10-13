import React from 'react';

class PostAct extends React.Component {
  render() {
    return (
      <div className='postAct'>
        <button className='like'>Like</button>
        <button className='comment'>Comment</button>
        <button className='share'>Share</button>
      </div>
    );
  }
}

export default PostAct;
