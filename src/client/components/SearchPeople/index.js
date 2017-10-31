
import React from 'react';
import People from '../People';

class SearchPeople extends React.Component {
  render() {
    let peopleToRender = this.props.peopleInfo;

    peopleToRender = peopleToRender.map((item, key) =>
      <People item={item} key={key}/>
    );
    return (
      <div className="search-people">
        <h1 className="search-title">People</h1>
        {peopleToRender}
      </div>
    );
  }
}

export default SearchPeople;