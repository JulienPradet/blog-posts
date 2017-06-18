import React from "react";
import introduction from "./introduction.md";
import tldr from "./tl-dr.md";
import layers from "./layers.md";
import willChange from "./will-change.md";
import willChange2 from "./will-change-2.md";
import Demo from "../../../site/Demo";
import DemoLag from "./DemoLag";
import withPrismCss from "../../../site/withPrismCss";

const Article = props =>
  <div>
    <div dangerouslySetInnerHTML={{ __html: introduction }} />
    <div dangerouslySetInnerHTML={{ __html: tldr }} />
    <div dangerouslySetInnerHTML={{ __html: layers }} />
    <Demo>{() => <DemoLag id="moving-box-lag" />}</Demo>
    <div dangerouslySetInnerHTML={{ __html: willChange }} />
    <Demo>{() => <DemoLag id="moving-box-fast" fast />}</Demo>
    <div dangerouslySetInnerHTML={{ __html: willChange2 }} />
  </div>;

export default withPrismCss()(Article);
