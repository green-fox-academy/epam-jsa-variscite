'use strict';

import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import Comment from '../../components/Comment';

class FeedPage extends React.Component {
  render() {
    return (
      <div>
        <Header isLoggedIn={true}/>
        <main className='container'>
          <Comment CommentInfo={CommentInfo}/>
        </main>
      </div>
    );
  }
}

let CommentInfo = {
  Username: 'Hillary Clinton',
  CommentTime: '10th Oct at 11:42PM',
  UserPicURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9HKJuqE3ZmpAWaWHEbFAvsCsktkwEFZ-aNKy9eo1VGvTh_hE',
  MyPicURL: 'https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg',
};

export default FeedPage;
