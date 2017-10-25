import React from 'react';
import PagePreview from '../PagePreview';
import {Link} from 'react-router-dom';
import './style.scss';

class SuggestedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [
        {
          id: 1,
          pageImg: 'http://static.adweek.com/adweek.com-prod/wp-content/uploads/files/white-house-logo-hed-2016.jpg',
          pageTitle: 'White House Community',
          pageDetail: '1,977,224,566 likes. 25,888,456,900 talking about this.'
        },
        {
          id: 2,
          pageImg: 'http://static.adweek.com/adweek.com-prod/wp-content/uploads/files/white-house-logo-hed-2016.jpg',
          pageTitle: 'White House Community',
          pageDetail: '1,977,224,566 likes. 25,888,456,900 talking about this.'
        }
      ],
    }
  }
  render() {
    let pagesToRender = this.state.pages;

    pagesToRender = pagesToRender.map(function(item, key) {
      return (
        <PagePreview item={item} key={item.id}/>
      );
    });
    return (
      <div className="suggested-page">
        <h1>My Page</h1>
        {pagesToRender}
        <Link to='/createNewPage'>Create a Page</Link>
      </div>
    );
  }
}

export default SuggestedPage;
