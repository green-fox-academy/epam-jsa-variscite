import React from 'react';

var SuggestedPage = function(props){
  return (
    <div className="page-preview">
      <img src={props.item.pageImg} />
      <span>{props.item.pageTitle}</span>
      <p>{props.item.pageDetail}</p>
    </div>
  );
};

export default SuggestedPage;
