import React from 'react';
import PagePreview from '../PagePreview';
import './style.scss';

class SuggestedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [
        {
          id: 1,
          pageImg: 'https://goo.gl/images/Q79Sfs',
          pageTitle: 'White House Community',
          pageDetail: '1,977,224,566 likes. 25,888,456,900 talking about this.'
        },
        {
          id: 2,
          pageImg: 'https://goo.gl/images/Q79Sfs',
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
        <span>My Page</span>
        {pagesToRender}
        <a>Create a Page</a>
      </div>
    );
  }
}

export default SuggestedPage;
