
import React from 'react';
import PostAndComment from '../PostAndComment';

class SearchPost extends React.Component {
  render() {
    let postsToRender = this.props.postsInfo;

    postsToRender = postsToRender.map((item, key) =>
      <PostAndComment item={item} key={key} />
    );

    return (
      <div className="search-post">
        <h1 className="search-title">Public Posts</h1>
        {postsToRender}
      </div>
    );
  }
}

export default SearchPost;
