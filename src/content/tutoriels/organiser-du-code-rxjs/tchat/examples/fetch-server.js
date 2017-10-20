import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/startWith";
import init from "../core/init";
import fakeReceiveMessageFromServerDriver from "../server/fake-receive-message-from-server-driver";
import domDriver from "../core/domDriver";
import displayView from "../view";
import makeReceivedMessage$ from "./utils/received-message";

const App = ({ receiveMessage }) => {
  const receivedMessage$ = makeReceivedMessage$(receiveMessage.stream$);

  const messageList$ = receivedMessage$
    .scan((previousMessageList, newMessage) => {
      previousMessageList.push(newMessage);

      return previousMessageList;
    }, [])
    .startWith([]);

  const model$ = messageList$.map(messageList => ({ messageList }));

  const view$ = model$.switchMap(model => displayView(model));

  return {
    dom: view$
  };
};

export default domElement =>
  init(App, {
    dom: domDriver(domElement),
    receiveMessage: fakeReceiveMessageFromServerDriver()
  });
