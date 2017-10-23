'use strict';

import React from 'react';
import Post from '../../components/Post';
import Comment from '../../components/Comment';

class PostComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isInputDisplay: false};
  }

  showInput() {
    if (this.state.isInputDisplay === true) {
      this.setState({isInputDisplay: false});
    } else {
      this.setState({isInputDisplay: true});
    }
  }
  render() {
    return (
      <div key={this.props.item._id} className="post-comment-container">
        <Post item={this.props.item} showInput = {() => this.showInput()}/>
        <Comment post_id={this.props.item._id} inputBoxState={this.state.isInputDisplay}/>
      </div>
    );
  }
}

export default PostComment;
