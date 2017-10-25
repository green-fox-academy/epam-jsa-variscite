import React from 'react';
import PagePreview from '../PagePreview';
import {Link} from 'react-router-dom';
import './style.scss';

function SuggestedPage(props) {
  let pagesToRender = props.pages;

  pagesToRender = pagesToRender.map(function(item, key) {
    return (
      <PagePreview item={item} key={item.id}/>
    );
  });
  return (
    <div className="suggested-page">
      <h1>Suggested Page</h1>
      {pagesToRender}
      <Link to="/createNewPage">Create a Page</Link>
    </div>
  );
}

SuggestedPage.defaultProps = {
  pages:
  [
    {
      id: 1,
      pageImg: 'http://static.adweek.com/adweek.com-prod/wp-content/uploads/files/white-house-logo-hed-2016.jpg',
      pageTitle: 'White House Community',
      pageDetail: '1,977,224,566 likes. 25,888,456,900 talking about this.',
    },
    {
      id: 2,
      pageImg: 'http://static6.businessinsider.com/image/2837544b221e9b49c4004b00-1190-625/putin-set-to-be-russian-president-again.jpg',
      pageTitle: 'Putin Fanbase',
      pageDetail: '57,324,666 likes. 909,756,900 talking about this.',
    },
  ],
};

export default SuggestedPage;
