import React from 'react';
import Menu from '../Menu';

class OtherOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  switchState() {
    this.setState({open: !this.state.open});
  }

  handleClose() {
    this.setState({open: false});
  }

  componentDidMount() {
    document.querySelector('html').addEventListener('click', function(event) {
      if (event.target.classList.contains('setting-button')) {
        this.switchState();
      } else if (event.target.className !== 'menu-option') {
        this.handleClose();
      }
    }.bind(this), false);
  }

  render() {
    return (
      <div className="other-options">
        <button className="option-button">Home</button>
        <button className="option-button">Friends</button>
        <button className="option-button mystery-button img-button"></button>
        <div className="menu-block">
          <button className="option-button setting-button img-button" >
          </button>
          {this.state.open === true ? <Menu /> : null}
        </div>
      </div>
    );
  }
}

export default OtherOptions;
