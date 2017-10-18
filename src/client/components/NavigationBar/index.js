import React from 'react';
import MainLinks from '../MainLinks';
import Explore from '../Explore';
import Shortcut from '../Shortcut';
import './style.scss';

class NavigationBar extends React.Component {
  render() {
    return (
      <aside className="navigation-bar">
        <MainLinks />
        <Explore />
        <Shortcut />
      </aside>
    );
  }
}

export default NavigationBar;
