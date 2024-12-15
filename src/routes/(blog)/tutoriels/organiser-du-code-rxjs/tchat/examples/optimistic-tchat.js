import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/publishReplay';
import init from '../core/init';
import domDriver from '../core/domDriver';
import fakeReceiveMessageFromServerDriver from '../server/fake-receive-message-from-server-driver';
import fakeSendMessageToServerDriver from '../server/fake-send-message-to-server-driver';
import displayView from '../view';
import makeReceivedMessage$ from './utils/received-message';
import makeSendMessageIntent$ from './utils/send-message-intent';
import makeSentMessage$ from './utils/sent-message';
import isSameMessage from './utils/is-same-message';

const App = ({ dom, receiveMessage, sendMessage }) => {
	const receivedMessage$ = makeReceivedMessage$(receiveMessage.stream$).map((message) => ({
		action: 'ajouter_message',
		message: message
	}));

	const sendMessageIntent$ = makeSendMessageIntent$(dom).publish();
	sendMessageIntent$.connect();

	const sentMessage$ = sendMessageIntent$
		.map(({ message }) => ({
			action: 'ajouter_message',
			message: {
				content: message,
				type: 'sent_message',
				is_confirmed: false
			}
		}))
		.merge(
			makeSentMessage$(sendMessage).map((message) => ({
				action: 'confirmer_message',
				message: { ...message, is_confirmed: true }
			}))
		);

	const messageList$ = Observable.merge(receivedMessage$, sentMessage$)
		.scan((previousMessageList, { action, message }) => {
			if (action === 'ajouter_message') {
				return [...previousMessageList, message];
			} else if (action === 'confirmer_message') {
				const newMessageList = previousMessageList.filter(
					(unconfirmedMessage) => !isSameMessage(unconfirmedMessage, message)
				);

				return [...newMessageList, message];
			} else {
				return previousMessageList;
			}
		}, [])
		.startWith([]);

	const model$ = messageList$.map((messageList) => ({ messageList }));

	const view$ = model$.switchMap((model) => displayView(model));

	return {
		dom: view$,
		sendMessage: sendMessageIntent$
	};
};

export default (domElement) =>
	init(App, {
		dom: domDriver(domElement),
		receiveMessage: fakeReceiveMessageFromServerDriver(),
		sendMessage: fakeSendMessageToServerDriver()
	});
