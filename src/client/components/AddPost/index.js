import React from 'react';
import './style.scss';
import HTTP_STATUSES from '../../modules/httpStatuses';

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'errorMessage': null
    };
  }

  post(event) {
    event.preventDefault();
    let postContent = {content: event.target.elements.namedItem('input').value};
    if(postContent.content.length > 2){
      this.sendPost(postContent);
    } else {
      this.setState({'errorMessage': 'Please enter more words!'});
    }
  }

  handlePostError(status, res) {
    if(status === BAD_REQUEST) {
      errorMessage = 'Something went wrong, please try later!';
      this.setState({'errorMessage': errorMessage});
    } else if (status === UNAUTHORIZED) {
      errorMessage = 'You are not authorized! Please log in first!';
      this.setState({'errorMessage': errorMessage});
    } else if (status === FORBIDDEN) {
      errorMessage = 'Please enter more words!';
      this.setState({'errorMessage': errorMessage});
    } else if (status === SERVER_ERROR) {
      errorMessage = 'Sorry! Cannot connect to the database, please try again later!';
      this.setState({'errorMessage': errorMessage});
    }
  }

  sendPost(data) {
    let xhr = new XMLHttpRequest();
    let token = window.localStorage.token;

    xhr.addEventListener('readystatechange', function() {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        this.handlePostError(xhr.status, xhr.response);
        window.location.reload();
      }
    }.bind(this));
    xhr.open('POST', '/api/post');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send(JSON.stringify(data));
  }

  render() {
    return (
      <div className="compose-container">
        <img src={this.props.myPicURL} />
        <form className="compose"
          onSubmit={this.post.bind(this)}>
          <textarea name="input" required
            placeholder="What's on your mind?"></textarea>
          <div className="act">
            <div>
              <button className="photo" type="button">photo</button>
              <button className="checkin" type="button">check in</button>
              <button className="tag" type="button">tag friend</button>
            </div>
            {this.state.errorMessage !== null ? <span className="error">
              {this.state.errorMessage}</span> : null}
            <input type="submit" value="Post"></input>
          </div>
        </form>
      </div>
    );
  }
}

AddPost.defaultProps = {myPicURL: 'https://pixel.nymag.com/imgs/daily/vulture/2016/08/11/11-obama-sex-playlist.w190.h190.2x.jpg'};

export default AddPost;
