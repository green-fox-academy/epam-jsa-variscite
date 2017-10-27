import React from 'react';
import './style.scss';

class AddPost extends React.Component {
  render() {
    return (
      <div className="compose-container">
        <img src={this.props.myPicURL} />
        <form className="compose" onSubmit={this.props.onSubmit}>
          <textarea name="input" required
            placeholder="What's on your mind?"></textarea>
          <div className="act">
            <div>
              <button className="photo" type="button">photo</button>
              <button className="checkin" type="button">check in</button>
              <button className="tag" type="button">tag friend</button>
            </div>
            {this.props.errorMessage !== null ? <span className="error">
              {this.props.errorMessage}</span> : null}
            <input type="submit" value="Post"></input>
          </div>
        </form>
      </div>
    );
  }
}

AddPost.defaultProps = {myPicURL: 'https://www.nbr.co.nz/sites/default/files/blog_post_img/Trump-impact_0.jpg'};

export default AddPost;
