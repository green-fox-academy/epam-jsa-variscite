import React from 'react';
import Menu from '../Menu';
import {Link} from 'react-router-dom';

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
        <Link className="option-button link" to="/feed">Home</Link>
        {/* <button className="option-button" onClick={function() {
          window.location.href = '/feed';
        }}>Home</button> */}
        <Link className="option-button link" to="/friendlist">Friends</Link>
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
