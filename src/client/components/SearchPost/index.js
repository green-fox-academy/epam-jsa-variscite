
import React from 'react';
import PostAndComment from '../PostAndComment';

class SearchPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'posts': [],
      'errorMessage': null,
    };
  }
  render() {
    let postsToRender = this.state.posts;

    postsToRender = postsToRender.map((item, key) =>
      <PostAndComment item={item} key={key}/>
    );
    return (
      <div className="search-post">
        {postsToRender}
      </div>
    );
  }
}

export default SearchPost;
