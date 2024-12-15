// import React from 'react';
// import Svg from 'react-svg-inline';
// import introduction from './introduction.md';
// import mvi1 from './mvi-1.md';
// import mvi2 from './mvi-2.md';
// import mvi3 from './mvi-3.md';
// import mvi4 from './mvi-4.md';
// import miseEnPratique1 from './mise-en-pratique-1.md';
// import miseEnPratique12 from './mise-en-pratique-1-2.md';
// import miseEnPratique2 from './mise-en-pratique-2.md';
// import miseEnPratique3 from './mise-en-pratique-3.md';
// import miseEnPratique32 from './mise-en-pratique-3-2.md';
// import miseEnPratique4 from './mise-en-pratique-4.md';
// import miseEnPratique42 from './mise-en-pratique-4-2.md';
// import miseEnPratique5 from './mise-en-pratique-5.md';
// import optimisticUpdate1 from './optimistic-update-1.md';
// import optimisticUpdate2 from './optimistic-update-2.md';
// import optimisticUpdate3 from './optimistic-update-3.md';
// import optimisticUpdate4 from './optimistic-update-4.md';
// import optimisticUpdate5 from './optimistic-update-5.md';
// import optimisticUpdate6 from './optimistic-update-6.md';
// import conclusion from './conclusion.md';
// // import withPrismCss from '../../../site/util/withPrismCss';
// import SchemaReceiveMessage from './schema-receive-message';
// import SchemaReceivedMessageList from './schema-received-message-list';
// import SchemaSendMessageIntent from './schema-send-message-intent';
// import SchemaSendMessageIntentFromView from './schema-send-message-intent-from-view';
// import SchemaSendMessage from './schema-send-message';
// import SchemaMergeModel from './schema-merge-model';
// import SchemaReceiveMessageAction from './schema-receive-message-action';
// import SchemaSendMessageAction from './schema-send-message-action';
// import SchemaConfirmMessageAction from './schema-confirm-message-action';
// import SchemaFinalModel from './schema-final-model';
// import SchemaMvc from './mvc.svg';
// import SchemaMv from './mv.svg';
// import SchemaMvi from './mvi.svg';
// import Demo from '../../../../components/Demo.svelte';
// import TchatDemo from './tchat-demo';

// const makePath = (path) => 'src/content/tutoriels/organiser-du-code-rxjs/' + path;

// const Article = () => (
// 	<div>
// 		<div dangerouslySetInnerHTML={{ __html: introduction }} />
// 		<div dangerouslySetInnerHTML={{ __html: mvi1 }} />
// 		<figure>
// 			<Svg svg={SchemaMvc} />
// 		</figure>
// 		<div dangerouslySetInnerHTML={{ __html: mvi2 }} />
// 		<figure>
// 			<Svg svg={SchemaMv} />
// 		</figure>
// 		<div dangerouslySetInnerHTML={{ __html: mvi3 }} />
// 		<figure>
// 			<Svg svg={SchemaMvi} />
// 		</figure>
// 		<div dangerouslySetInnerHTML={{ __html: mvi4 }} />
// 		<div dangerouslySetInnerHTML={{ __html: miseEnPratique1 }} />
// 		<Demo>
// 			{() => (
// 				<TchatDemo
// 					App={() => import('./tchat/examples/static')}
// 					path={makePath('tchat/examples/static.js')}
// 				/>
// 			)}
// 		</Demo>
// 		<div dangerouslySetInnerHTML={{ __html: miseEnPratique12 }} />
// 		<SchemaReceiveMessage />
// 		<div dangerouslySetInnerHTML={{ __html: miseEnPratique2 }} />
// 		<SchemaReceivedMessageList />
// 		<Demo>
// 			{() => (
// 				<TchatDemo
// 					App={() => import('./tchat/examples/fetch-server')}
// 					path={makePath('tchat/examples/fetch-server.js')}
// 				/>
// 			)}
// 		</Demo>
// 		<div dangerouslySetInnerHTML={{ __html: miseEnPratique3 }} />
// 		<SchemaSendMessageIntent />
// 		<div dangerouslySetInnerHTML={{ __html: miseEnPratique32 }} />
// 		<SchemaSendMessageIntentFromView />
// 		<div dangerouslySetInnerHTML={{ __html: miseEnPratique4 }} />
// 		<SchemaSendMessage />
// 		<div dangerouslySetInnerHTML={{ __html: miseEnPratique42 }} />
// 		<SchemaMergeModel />
// 		<Demo>
// 			{() => (
// 				<TchatDemo
// 					App={() => import('./tchat/examples/send-message')}
// 					path={makePath('tchat/examples/send-message.js')}
// 				/>
// 			)}
// 		</Demo>
// 		<div dangerouslySetInnerHTML={{ __html: miseEnPratique5 }} />
// 		<div dangerouslySetInnerHTML={{ __html: optimisticUpdate1 }} />
// 		<div dangerouslySetInnerHTML={{ __html: optimisticUpdate2 }} />
// 		<SchemaReceiveMessageAction />
// 		<div dangerouslySetInnerHTML={{ __html: optimisticUpdate3 }} />
// 		<SchemaSendMessageAction />
// 		<div dangerouslySetInnerHTML={{ __html: optimisticUpdate4 }} />
// 		<SchemaConfirmMessageAction />
// 		<div dangerouslySetInnerHTML={{ __html: optimisticUpdate5 }} />
// 		<SchemaFinalModel />
// 		<Demo>
// 			{() => (
// 				<TchatDemo
// 					App={() => import('./tchat/examples/optimistic-tchat')}
// 					path={makePath('tchat/examples/optimistic-tchat.js')}
// 				/>
// 			)}
// 		</Demo>
// 		<div dangerouslySetInnerHTML={{ __html: optimisticUpdate6 }} />
// 		<div dangerouslySetInnerHTML={{ __html: conclusion }} />
// 	</div>
// );

// export default withPrismCss()(Article);
