'use strict';

import ReactDOM from 'react-dom'; // eslint-disable-line no-unused-vars
import React from 'react';
import Header from '../../components/Header';
import NavigationBar from '../../components/NavigationBar';
import Menu from '../../components/Menu';

class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        <Header isLoggedIn={true} show = {() => this.handleOpen()} />
        <NavigationBar />
        {this.state.open === true ? <Menu /> : null}
      </div>
    );
  }
}

export default FeedPage;
