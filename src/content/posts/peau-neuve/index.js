import React from "react";
import Code from "../../../site/components/Code";
import introduction from "./introduction.md";
import entrypoint1 from "./entrypoint1.md";
import entrypoint2 from "./entrypoint2.md";
import entrypoint3 from "./entrypoint3.md";
import ssr1 from "./ssr1.md";
import ssr2 from "./ssr2.md";
import ssr3 from "./ssr3.md";
import performance from "./performance.md";
import readPagesCode from "./readPages.code";
import createMatchCode from "./createMatch.code";
import webpackServerCode from "./webpackServer.code";
import serverCode from "./server.code";

const Article = () => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: introduction }} />
    <div dangerouslySetInnerHTML={{ __html: entrypoint1 }} />
    <Code>{readPagesCode}</Code>
    <div dangerouslySetInnerHTML={{ __html: entrypoint2 }} />
    <Code>{createMatchCode}</Code>
    <div dangerouslySetInnerHTML={{ __html: entrypoint3 }} />
    <div dangerouslySetInnerHTML={{ __html: ssr1 }} />
    <Code>{webpackServerCode}</Code>
    <div dangerouslySetInnerHTML={{ __html: ssr2 }} />
    <Code>{serverCode}</Code>
    <div dangerouslySetInnerHTML={{ __html: ssr3 }} />
    <div dangerouslySetInnerHTML={{ __html: performance }} />
  </div>
);

export default Article;
