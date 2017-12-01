import React from "react";
import Route from "react-router/Route";
import getLayout from "./util/getLayout";
import Analytics from "./Analytics";

const LayoutRoutes = ({ routes }) => {
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
                      return (
                        <Page
                          match={match}
                          page={routes[layoutType][currentPage].meta}
                          path={currentPage}
                        />
                      );
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

  return (
    <div>
      {layoutRoutes}
      <Route component={Analytics} />
    </div>
  );
};

export default LayoutRoutes;
