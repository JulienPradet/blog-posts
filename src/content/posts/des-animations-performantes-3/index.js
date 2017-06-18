import React from "react";
import Demo from "../../../site/Demo";
import Code from "../../../site/Code";
import introduction from "./introduction.md";
import tldr from "./tl-dr.md";
import layout from "./pourquoi-layout.md";
import layout2 from "./pourquoi-layout-2.md";
import layout3 from "./pourquoi-layout-3.md";
import layout4 from "./pourquoi-layout-4.md";
import layout5 from "./pourquoi-layout-5.md";
import eviter from "./eviter-layout.md";
import eviter2 from "./eviter-layout-2.md";
import eviter3 from "./eviter-layout-3.md";
import animation from "./animation.md";
import animation2 from "./animation-2.md";
import conclusion from "./conclusion.md";
import layoutThrashingCode from "./layout-thrashing.js.code";
import noLayoutThrashingCode from "./no-layout-thrashing.js.code";
import noLayoutThrashingRafCode from "./no-layout-thrashing-raf.js.code";
import rafLoopCode from "./raf-loop.js.code";
import InterruptAnimation from "./InterruptAnimation";
import withPrismCss from "../../../site/withPrismCss";

const Article = props =>
  <div>
    <div dangerouslySetInnerHTML={{ __html: introduction }} />
    <div dangerouslySetInnerHTML={{ __html: tldr }} />
    <div dangerouslySetInnerHTML={{ __html: layout }} />
    <Demo>{() => <InterruptAnimation length={3} />}</Demo>
    <div dangerouslySetInnerHTML={{ __html: layout2 }} />
    <Demo>{() => <InterruptAnimation length={3} checkStart />}</Demo>
    <div dangerouslySetInnerHTML={{ __html: layout3 }} />
    <Code>{layoutThrashingCode}</Code>
    <div dangerouslySetInnerHTML={{ __html: layout4 }} />
    <Demo>{() => <InterruptAnimation length={400} checkStart />}</Demo>
    <div dangerouslySetInnerHTML={{ __html: layout5 }} />
    <div dangerouslySetInnerHTML={{ __html: eviter }} />
    <Code>{noLayoutThrashingCode}</Code>
    <div dangerouslySetInnerHTML={{ __html: eviter2 }} />
    <Code>{noLayoutThrashingRafCode}</Code>
    <div dangerouslySetInnerHTML={{ __html: eviter3 }} />
    <Demo>
      {() =>
        <InterruptAnimation length={400} checkStart withoutLayoutThrashing />}
    </Demo>
    <div dangerouslySetInnerHTML={{ __html: animation }} />
    <Code>{rafLoopCode}</Code>
    <div dangerouslySetInnerHTML={{ __html: animation2 }} />
    <div dangerouslySetInnerHTML={{ __html: conclusion }} />
  </div>;

export default withPrismCss()(Article);
