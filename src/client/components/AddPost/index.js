import React from 'react';
import './style.scss';

class ComposePost extends React.Component {
  render() {
    return (
      <div className="composeContainer">
        <img src={this.props.ComposeInfo.MyPicURL} />
        <form required className="compose">
          <input type="text" name="input" required placeholder="What's on your mind?"></input>
          <div className="act">
            <div>
              <button className="photo">photo</button>
              <button className="checkin">check in</button>
              <button className="tag">tag friend</button>
            </div>
            <input type="submit" value="Post"></input>
          </div>

        </form>
      </div>
    );
  }
}

export default ComposePost;
