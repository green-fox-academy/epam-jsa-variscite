import React from 'react';
import './style.scss';
import Upload from 'antd/lib/upload';

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.handlePostImgSubmit = this.handlePostImgSubmit.bind(this);
  }
  getSignedRequest(file) {
    return fetch(`/sign-s3?fileName=${file.name}&fileType=${file.type}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      });
  }

  uploadFile(binaryFile, signedRequest, url) {
    const options = {
      method: 'PUT',
      body: binaryFile,
    };

    return fetch(signedRequest, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return url;
      });
  }

  uploadToS3(file) {
    return this.getSignedRequest(file)
      .then((json) => this.uploadFile(file, json.signedRequest, json.url))
      .then((url) => url).catch((err) => {
        console.error(err);
        return null;
      });
  }

  handlePostImgSubmit(file) {
    const that = this;

    this.uploadToS3(file.file)
      .then((url) => {
        that.props.setImgURL(url);
      });
  }

  openDialog() {
    document.querySelector('.ant-upload input').click();
  }
  render() {
    const props = {
      action: '/',
      customRequest: this.handlePostImgSubmit,
    };

    return (
      <div className="compose-container">
        <img src={this.props.userPicURL} />
        <form className="compose" onSubmit={this.props.onSubmit}>
          <textarea name="input" required
            placeholder="What's on your mind?"></textarea>
          <div className="act">
            <div>
              <button className="photo" type="button" onClick={this.openDialog}>photo</button>
              <button className="checkin" type="button">check in</button>
              <button className="tag" type="button">tag friend</button>
            </div>
            <Upload {...props} className="upload-dialog">
              <div>
                  upload
              </div>
            </Upload>
            {this.props.errorMessage !== null ? <span className="error">
              {this.props.errorMessage}</span> : null}
            <input type="submit" value="Post"></input>
          </div>
        </form>
      </div>
    );
  }
}

export default AddPost;
