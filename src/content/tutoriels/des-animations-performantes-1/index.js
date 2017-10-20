import React from "react";
import TabCode from "../../../site/components/TabCode";
import introduction from "./introduction.md";
import tdlr from "./tl-dr.md";
import cssTransition1 from "./css-transition1.md";
import cssTransition2 from "./css-transition2.md";
import cssTransition3 from "./css-transition3.md";
import cssTransitionSimpleCode from "./css-transition-simple.code?css";
import cssTransitionFullCode from "./css-transition-full.code?css";
import howItWorks from "./how-it-works.md";
import whatAboutLayout1 from "./what-about-layout1.md";
import whatAboutLayout2 from "./what-about-layout2.md";
import whatAboutLayoutHtmlCode from "./what-about-layout-html.code?html";
import whatAboutLayoutCssCode from "./what-about-layout-css.code?css";
import HoverButton from "./HoverButton";

const Article = () => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: introduction }} />
    <div dangerouslySetInnerHTML={{ __html: tdlr }} />
    <div dangerouslySetInnerHTML={{ __html: cssTransition1 }} />
    <HoverButton />
    <div dangerouslySetInnerHTML={{ __html: cssTransition2 }} />
    <TabCode
      tabs={[
        { label: "Simplifié", code: cssTransitionSimpleCode },
        { label: "Complet", code: cssTransitionFullCode }
      ]}
    />
    <div dangerouslySetInnerHTML={{ __html: cssTransition3 }} />
    <div dangerouslySetInnerHTML={{ __html: howItWorks }} />
    <div dangerouslySetInnerHTML={{ __html: whatAboutLayout1 }} />
    <TabCode
      tabs={[
        { label: "HTML", code: whatAboutLayoutHtmlCode },
        { label: "CSS", code: whatAboutLayoutCssCode }
      ]}
    />
    <div dangerouslySetInnerHTML={{ __html: whatAboutLayout2 }} />
  </div>
);

export default Article;
