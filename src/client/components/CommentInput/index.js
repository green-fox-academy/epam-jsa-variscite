import React from 'react';

class CommentInput extends React.Component {
  render() {
    return (
      <div className='commentInput'>
        <img className='userPic' src='https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg' />
        <input placeholder='post a comment'></input>
      </div>
    );
  }
}

export default CommentInput;
