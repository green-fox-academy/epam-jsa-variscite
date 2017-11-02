import React from 'react';
import {Link} from 'react-router-dom';

class People extends React.Component {
  render() {
    return (
      <div className="people-container">
        <div className="people-info">
          <img src={this.props.item.userPicURL}/>
          <Link className="user-name" to={'/profile?=' + this.props.item.username}>{this.props.item.username}</Link>
        </div>
        <Link className="more-info" to={'/profile?=' + this.props.item.username}>More Info</Link>
      </div>
    );
  }
}

export default People;
