import React from 'react';

class SuggestedPage extends React.Component {
  render() {

    return (
      <div className="page-preview">
        <img src={this.props.item.pageImg} />
        <span>{this.props.item.pageTitle}</span>
        <p>{this.props.item.pageDetail}</p>
      </div>
    );
  }
}

export default SuggestedPage;
