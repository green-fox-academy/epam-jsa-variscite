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
        <Comment CommentInfo={Info}/>
      </div>
    );
  }
}

let Info = {
  Username: 'Hillary Clinton',
  CommentTime: '10th Oct at 11:42PM',
  UserPicURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk9HKJuqE3ZmpAWaWHEbFAvsCsktkwEFZ-aNKy9eo1VGvTh_hE',
};

export default FeedPage;
