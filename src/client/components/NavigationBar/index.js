import React from 'react';
import Greeting from '../Greeting';
import MainLinks from '../MainLinks';
import Expore from '../Expore';
import Shotcut from '../Shotcut';

class NavigationBar extends React.Component {
  render() {
    return (
      <aside className="navigation-bar">
        <Greeting />
        <MainLinks />
        <Expore />
        <Shotcut />
      </aside>
    );
  }
}

export default NavigationBar;
