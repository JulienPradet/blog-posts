import React from "react";
import withPrismCss from "../../../site/util/withPrismCss";
import content from "./content.md";
import content2 from "./content-2.md";
import content3 from "./content-3.md";
import content4 from "./content-4.md";
import content5 from "./content-5.md";
import content6 from "./content-6.md";
import content7 from "./content-7.md";
import VizExample from "./viz-example";
import { Tree, Node } from "./demo";
import NodeDemo from "./examples/NodeDemo";
import SizedNodeDemo from "./examples/SizedNodeDemo";
import ContextNodeDemo from "./examples/ContextNodeDemo";
import TreeDemo from "./examples/TreeDemo";

const Article = props => (
  <div>
    <div
      ref={props.markdownRef}
      dangerouslySetInnerHTML={{ __html: content }}
    />

    <figure>
      <VizExample />
      <figcaption>Un tas de lignes avec des bulles dessus, quoi.</figcaption>
    </figure>

    <div
      ref={props.markdownRef}
      dangerouslySetInnerHTML={{ __html: content2 }}
    />

    <figure>
      <Tree>
        <Node name="Camille">
          <Node name="Bob">
            <Node name="Raymonde">
              <Node name="Jules" />
            </Node>
            <Node name="Pierre" />
          </Node>
          <Node name="Alice">
            <Node name="Alphonse" />
            <Node name="Gertrude" />
          </Node>
        </Node>
      </Tree>
      <figcaption>Un tas de lignes avec des bulles dessus, quoi.</figcaption>
    </figure>

    <div
      ref={props.markdownRef}
      dangerouslySetInnerHTML={{ __html: content3 }}
    />

    <figure>
      <NodeDemo />
    </figure>

    <div
      ref={props.markdownRef}
      dangerouslySetInnerHTML={{ __html: content4 }}
    />

    <figure>
      <SizedNodeDemo />
    </figure>

    <div
      ref={props.markdownRef}
      dangerouslySetInnerHTML={{ __html: content5 }}
    />

    <figure>
      <ContextNodeDemo />
    </figure>

    <div
      ref={props.markdownRef}
      dangerouslySetInnerHTML={{ __html: content6 }}
    />

    <figure>
      <TreeDemo />
    </figure>

    <div
      ref={props.markdownRef}
      dangerouslySetInnerHTML={{ __html: content7 }}
    />
  </div>
);

export default withPrismCss()(Article);
