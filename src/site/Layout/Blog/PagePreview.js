import React from "react";

const PagePreview = ({ page }) => {
  return (
    <div className="page-preview">
      <h3>{page.title}</h3>
      <p>{page.description}</p>
    </div>
  );
};

export default PagePreview;
