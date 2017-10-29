
import React from 'react';
import People from '../People';
// import HTTP_STATUSES from '../../httpStatuses';
// import formatDate from '../../components/Module/formatDate';

class SearchPeople extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {'errorMessage': null};
  // }

  render() {
    let peopleToRender = this.props.peopleInfo;

    peopleToRender = peopleToRender.map((item, key) =>
      <People item={item} key={key}/>
    );
    return (
      <div className="search-people">
        {peopleToRender}
      </div>
    );
  }
}

export default SearchPeople;
