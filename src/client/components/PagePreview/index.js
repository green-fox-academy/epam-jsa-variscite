import React from 'react';

class SuggestedPage extends React.Component {
  render() {

    return (
      <div className="page-preview">
        <img src={this.props.pageImg} />
        <span>{this.props.pageTitle}</span>
        <p>{this.props.pageDetail}</p>
      </div>
    );
  }
}

export default SuggestedPage;
