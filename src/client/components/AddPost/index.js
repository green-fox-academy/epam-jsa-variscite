import React from 'react';
import './style.scss';

class AddPost extends React.Component {
  render() {
    return (
      <div className="composeContainer">
        <img src={this.props.MyPicURL} />
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

AddPost.defaultProps = {MyPicURL: 'https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg' };

export default AddPost;
