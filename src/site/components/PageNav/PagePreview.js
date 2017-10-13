import React from "react";
import PageLink from "../PageLink";
import withRouter from "react-router/withRouter";

const PagePreview = ({ page, history }) => {
  return (
    <div className="page-preview" onClick={() => history.push(page.location)}>
      <h3>
        <PageLink to={page.location}>{page.title}</PageLink>
      </h3>
      <p>{page.description}</p>
    </div>
  );
};

export default withRouter(PagePreview);
