import React from 'react';

function PagePreview(props) {
  return (
    <div className="page-preview">
      <img src={props.item.pageImg} />
      <span>{props.item.pageTitle}</span>
      <p>{props.item.pageDetail}</p>
    </div>
  );
}

export default PagePreview;
