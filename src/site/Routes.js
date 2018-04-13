import React from "react";
import Route from "react-router/Route";
import Redirect from "react-router/Redirect";
import getLayout from "./util/getLayout";
import Analytics from "./Analytics";
import ScrollToTopOnUpdate from "./ScrollToTopOnUpdate";

const LayoutRoutes = ({ routes }) => {
  const layoutRoutes = Object.keys(routes).map(layoutType => {
    const Layout = getLayout(layoutType);

    return (
      <Route
        key={layoutType}
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
    <Route
      children={({ location }) => {
        if (/\/\//.test(location.pathname)) {
          return (
            <Redirect
              to={{
                ...location,
                pathname: location.pathname.replace(/\/\//g, "/")
              }}
            />
          );
        }

        return (
          <div>
            {process.env.SERVER ? (
              layoutRoutes
            ) : (
              <Route>
                {({ location }) => {
                  const route = location.pathname;
                  const routeIsRegistered = Object.keys(
                    routes
                  ).some(layoutType => {
                    return Object.keys(routes[layoutType]).some(
                      url => url === route
                    );
                  });

                  if (routeIsRegistered) {
                    return layoutRoutes;
                  } else {
                    return (
                      <Route location={{ pathname: "/404/" }}>
                        {() => layoutRoutes}
                      </Route>
                    );
                  }
                }}
              </Route>
            )}
            <Route component={ScrollToTopOnUpdate} />
            <Route component={Analytics} />
          </div>
        );
      }}
    />
  );
};

export default LayoutRoutes;
