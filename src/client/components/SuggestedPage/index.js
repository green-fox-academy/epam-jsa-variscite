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
      pageImg: 'https://facebook.github.io/react-native/img/opengraph.png',
      pageTitle: 'React Community',
      pageDetail: '1,977,566 likes. 25,456,900 talking about this.',
    },
    {
      id: 2,
      pageImg: 'http://a.abcnews.com/images/Technology/gty_mark_zuckerberg_ll_111101_wmain.jpg',
      pageTitle: 'Mark Zuckerberg Fanbase',
      pageDetail: '57,324,666 likes. 909,756,900 talking about this.',
    },
  ],
};

export default SuggestedPage;
