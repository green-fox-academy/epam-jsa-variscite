'use strict';

import './style.scss';
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import ProfileNav from '../../components/ProfileNav';
import ProfileMain from '../../components/ProfileMain';

class ProfilePage extends React.Component {
  render() {
    return (
      <div>
        <Header isLoggedIn={true} show = {() => this.handleOpen()} />
        <div className="photo-container">
          <img className="cover-photo" src="https://fb-s-c-a.akamaihd.net/h-ak-fbx/v/t31.0-8/1040146_477356329007858_898768630_o.jpg?oh=cdc892c2c395fd316feb6de63c4ff5b2&oe=5A7E205C&__gda__=1517761775_4a9c6cd0e7ddf36f151a3767c7943789"/>
          <img className="user-pic" src="https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg" />
          <ProfileNav />
        </div>
        <ProfileMain />
      </div>
    );
  }
}

export default ProfilePage;
