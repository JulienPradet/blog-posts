import React from "react";
import Link from "react-router-dom/Link";
import withRouter from "react-router/withRouter";

const PagePreview = ({ page, history }) => {
  return (
    <div className="page-preview" onClick={() => history.push(page.location)}>
      <h3><Link to={page.location}>{page.title}</Link></h3>
      <p>{page.description}</p>
    </div>
  );
};

export default withRouter(PagePreview);
