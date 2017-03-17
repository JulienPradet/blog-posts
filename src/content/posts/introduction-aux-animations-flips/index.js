import React from 'react';
import Code from '../../../site/Code';
import Demo from '../../../site/Demo';
import introduction from './introduction.md';
import flip2 from './flip2.md';
import flipCode from './flip.js.code';
import itsAKindOfMagic from './itsAKindOfMagic.md';
import itsAKindOfMagic2 from './itsAKindOfMagic2.md';
import itsAKindOfMagic3 from './itsAKindOfMagic3.md';
import ScaleProblem from './scaleProblem';
import ScaleSolution from './scaleSolution';
import withPrismCss from '../../../site/withPrismCss';

const Article = props => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: introduction }} />
    <Code>{flipCode}</Code>
    <div dangerouslySetInnerHTML={{ __html: flip2 }} />
    <div dangerouslySetInnerHTML={{ __html: itsAKindOfMagic }} />
    <Demo>{() => <ScaleProblem />}</Demo>
    <div dangerouslySetInnerHTML={{ __html: itsAKindOfMagic2 }} />
    <Demo>{() => <ScaleSolution />}</Demo>
    <div dangerouslySetInnerHTML={{ __html: itsAKindOfMagic3 }} />
  </div>
);

export default withPrismCss()(Article);
