import React from "react";
import Route from "react-router/Route";
import Redirect from "react-router/Redirect";
import getLayout from "./util/getLayout";

const LayoutRoutes = ({ routes, redirects }) => {
  const layoutRoutes = Object.keys(routes).map(layoutType => {
    const Layout = getLayout(layoutType);

    return (
      <Route
        key={layoutType}
        exact
        strict
        children={({ location }) => {
          const currentPage = Object.keys(routes[layoutType]).find(
            pageUrl => pageUrl === location.pathname
          );

          if (!currentPage) {
            return null;
          }

          return (
            <Layout
              page={routes[layoutType][currentPage].meta}
              path={currentPage}
            >
              {Object.keys(routes[layoutType]).map(pageUrl => {
                const Page = routes[layoutType][pageUrl].Component;
                return (
                  <Route
                    strict
                    exact
                    key={pageUrl}
                    path={pageUrl}
                    render={({ match }) => {
                      return <Page match={match} />;
                    }}
                  />
                );
              })}
            </Layout>
          );
        }}
      />
    );
  });

  const redirectRoutes = redirects.map(({ from, to }, index) => (
    <Route key={`redirect${index}`} exact strict path={from}>
      {({ match }) => match && match.isExact && <Redirect to={to} />}
    </Route>
  ));

  return (
    <div>
      {redirectRoutes}
      {layoutRoutes}
    </div>
  );
};

export default LayoutRoutes;
