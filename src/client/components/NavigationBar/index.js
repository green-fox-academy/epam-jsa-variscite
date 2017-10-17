import React from 'react';
import Greeting from '../Greeting';
import MainLinks from '../MainLinks';
import Explore from '../Explore';
import Shotcut from '../Shotcut';
import './style.scss';

class NavigationBar extends React.Component {
  render() {
    return (
      <aside className="navigation-bar">
        <Greeting />
        <MainLinks />
        <Explore />
        <Shotcut />
      </aside>
    );
  }
}

export default NavigationBar;
