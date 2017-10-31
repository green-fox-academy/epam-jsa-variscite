import React from 'react';
import {Link} from 'react-router-dom';

class People extends React.Component {
  render() {
    return (
      <div className="people-container">
        <div className="people-info">
          <img src={this.props.item.userPicURL}/>
          <Link to={'/profile?=' + this.props.item.username}>{this.props.item.username}</Link>
        </div>
        <button>Add Friend</button>
      </div>
    );
  }
}

export default People;
