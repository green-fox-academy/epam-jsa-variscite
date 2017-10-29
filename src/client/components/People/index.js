import React from 'react';

class People extends React.Component {
  render() {
    return (
      <div className="people-container">
        <div className="people-info">
          <img src={this.props.item.userPicURL}/>
          <h1>{this.props.item.username}</h1>
        </div>
        <button>Add Friend</button>
      </div>
    );
  }
}

export default People;
