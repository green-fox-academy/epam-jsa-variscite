import React from 'react';

class PostHeader extends React.Component {
  render() {
    return (
      <div className='postHeader'>
        <img className='userPic' src='https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/05/12/104466932-PE_Color.240x240.jpg?v=1494613853' />
        <div className='postTitle'>
          <p className='name'>Donald Trump</p>
          <p className='time'>10th Oct at 8:12PM</p>
        </div>
      </div>
    );
  }
}

export default PostHeader;
