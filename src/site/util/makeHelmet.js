import React from "react";
import Helmet from "react-helmet";

const makeHelmet = props => {
  const title = props.page ? props.page.title : "Blog";
  const image = props.page && props.page.image
    ? props.page.image
    : "https://pbs.twimg.com/profile_images/424964348461600768/aygHDGpF.png";

  return (
    <Helmet>
      <title>
        {`${title} | ${props.site.meta.author.name}`}
      </title>
      <meta charset="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width initial-scale=1" />
      <meta name="author" content="Julien Pradet" />
      {props.page &&
        <meta name="description" content={props.page.description} />}
      <meta name="theme-color" content="#00C9C9" />
      <meta property="twitter:site" content="@JulienPradet" />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content="@JulienPradet" />
      <meta property="twitter:title" content={title} />
      {props.page &&
        <meta
          property="twitter:description"
          content={
            (props.page.twitter && props.page.twitter.description) ||
            props.page.description
          }
        />}
      <meta property="twitter:image" content={image} />
      <meta property="og:site_name" content={props.site.meta.site_name} />
      <meta property="og:type" content="page" />
      <meta property="og:title" content={title} />
      <meta
        property="og:url"
        content={`${props.site.meta.homepage}${props.path}`}
      />
      <meta property="og:image" content={image} />
      {props.page &&
        <meta property="og:description" content={props.page.description} />}
      <link rel="canonical" href={`${props.site.meta.homepage}${props.path}`} />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Le flux RSS de Julien Pradet"
        href={`${props.site.meta.homepage}/feed.xml`}
      />
    </Helmet>
  );
};

export default makeHelmet;
