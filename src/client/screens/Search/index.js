'use strict';

import './style.scss';
import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import SearchNav from '../../components/SearchNav';
import SearchPost from '../../components/SearchPost';

class SearchPage extends React.Component {
  render() {
    return (
      <div>
        <Header isLoggedIn={true} />
        <SearchNav />
        <SearchPost />
      </div>
    );
  }
}

export default SearchPage;
