import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/startWith";
import init from "../core/init";
import domDriver from "../core/domDriver";
import fakeReceiveMessageFromServerDriver from "../server/fake-receive-message-from-server-driver";
import fakeSendMessageToServerDriver from "../server/fake-send-message-to-server-driver";
import displayView from "../view";
import makeReceivedMessage$ from "./utils/received-message";
import makeSendMessageIntent$ from "./utils/send-message-intent";
import makeSentMessage$ from "./utils/sent-message";

const App = ({ dom, receiveMessage, sendMessage }) => {
  const receivedMessage$ = makeReceivedMessage$(receiveMessage.stream$);

  const sendMessageIntent$ = makeSendMessageIntent$(dom);
  const sentMessage$ = makeSentMessage$(sendMessage);

  const messageList$ = Observable.merge(receivedMessage$, sentMessage$)
    .scan((previousMessageList, newMessage) => {
      previousMessageList.push(newMessage);

      return previousMessageList;
    }, [])
    .startWith([]);

  const model$ = messageList$.map(messageList => ({ messageList }));

  const view$ = model$.switchMap(model => displayView(model));

  return {
    dom: view$,
    sendMessage: sendMessageIntent$
  };
};

export default domElement =>
  init(App, {
    dom: domDriver(domElement),
    receiveMessage: fakeReceiveMessageFromServerDriver(),
    sendMessage: fakeSendMessageToServerDriver()
  });
