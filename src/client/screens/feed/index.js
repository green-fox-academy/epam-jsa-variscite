'use strict';

import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import Post from '../../components/Post';

let PostInfo = {
  Username: 'Donald Trump',
  PostText: 'Make America great again! #America #greatwall',
  PostTime: '10th Oct at 8:12PM',
  UserPicURL: 'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/05/12/104466932-PE_Color.240x240.jpg?v=1494613853',
  PostPicURL: 'http://ronpaulinstitute.org/media/121032/donald-trumps-mexico-border-wall-557313.jpg',
  NumOfLikes: 248,
  NumOfComments: 36,
  NumOfShares: 192,
};

class FeedPage extends React.Component {
  render() {
    return (
      <div>
        <Header isLoggedIn={true}/>
        <main className="container">
          <Post PostInfo={PostInfo}/>
        </main>
      </div>
    );
  }
}

export default FeedPage;
