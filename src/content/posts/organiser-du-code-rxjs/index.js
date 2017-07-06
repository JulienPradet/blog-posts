import React from "react";
import introduction from "./introduction.md";
import mvi1 from "./mvi-1.md";
import mvi2 from "./mvi-2.md";
import mvi3 from "./mvi-3.md";
import mvi4 from "./mvi-4.md";
import miseEnPratique1 from "./mise-en-pratique-1.md";
import miseEnPratique2 from "./mise-en-pratique-2.md";
import miseEnPratique3 from "./mise-en-pratique-3.md";
import miseEnPratique32 from "./mise-en-pratique-3-2.md";
import miseEnPratique4 from "./mise-en-pratique-4.md";
import miseEnPratique5 from "./mise-en-pratique-5.md";
import optimisticUpdate1 from "./optimistic-update-1.md";
import optimisticUpdate2 from "./optimistic-update-2.md";
import optimisticUpdate3 from "./optimistic-update-3.md";
import optimisticUpdate4 from "./optimistic-update-4.md";
import optimisticUpdate5 from "./optimistic-update-5.md";
import optimisticUpdate6 from "./optimistic-update-6.md";
import conclusion from "./conclusion.md";
import withPrismCss from "../../../site/withPrismCss";
import SchemaReceiveMessage from "./schema-receive-message";
import SchemaReceivedMessageList from "./schema-received-message-list";
import SchemaSendMessageIntent from "./schema-send-message-intent";
import SchemaSendMessageIntentFromView from "./schema-send-message-intent-from-view";

const Article = props =>
  <div>
    <div dangerouslySetInnerHTML={{ __html: introduction }} />
    <div dangerouslySetInnerHTML={{ __html: mvi1 }} />
    IMAGE MVC
    <div dangerouslySetInnerHTML={{ __html: mvi2 }} />
    IMAGE MV
    <div dangerouslySetInnerHTML={{ __html: mvi3 }} />
    IMAGE MVI
    <div dangerouslySetInnerHTML={{ __html: mvi4 }} />
    <div dangerouslySetInnerHTML={{ __html: miseEnPratique1 }} />
    <SchemaReceiveMessage />
    <div dangerouslySetInnerHTML={{ __html: miseEnPratique2 }} />
    <SchemaReceivedMessageList />
    <div dangerouslySetInnerHTML={{ __html: miseEnPratique3 }} />
    <SchemaSendMessageIntent />
    <div dangerouslySetInnerHTML={{ __html: miseEnPratique32 }} />
    <SchemaSendMessageIntentFromView />
    <div dangerouslySetInnerHTML={{ __html: miseEnPratique4 }} />
    IMAGE
    <div dangerouslySetInnerHTML={{ __html: miseEnPratique5 }} />
    <div dangerouslySetInnerHTML={{ __html: optimisticUpdate1 }} />
    IMAGE Aggrégation Avant/Après
    <div dangerouslySetInnerHTML={{ __html: optimisticUpdate2 }} />
    IMAGE
    <div dangerouslySetInnerHTML={{ __html: optimisticUpdate3 }} />
    IMAGE
    <div dangerouslySetInnerHTML={{ __html: optimisticUpdate4 }} />
    IMAGE
    <div dangerouslySetInnerHTML={{ __html: optimisticUpdate5 }} />
    IMAGE
    <div dangerouslySetInnerHTML={{ __html: optimisticUpdate6 }} />
    <div dangerouslySetInnerHTML={{ __html: conclusion }} />
  </div>;

export default withPrismCss()(Article);
