/** @jsx dom */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import dom from '../core/dom';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

// A noter que j'utilise la notation JSX pour faciliter la lecture.
// Cependant, à la première version de ce fichier, j'utilisais
// la fonction `dom` directement.
//
// dom('div', {className: "message"}, "Bonjour!")
// ===
// <div className="message">Bonjour!</div>

export default (model) => {
	const isConfirmed = (message) =>
		typeof message.is_confirmed === 'undefined' || message.is_confirmed;

	const viewMessage = (message) => (
		<div
			className={`message message--${message.type} message--${
				isConfirmed(message) ? 'confirmed' : 'waiting'
			}`}
		>
			<div className="message__content">{message.content}</div>
			<div className="message__author">{message.from || 'Envoi en cours...'}</div>
		</div>
	);

	const emptyMessage = (
		<div className="message message--empty">
			Pas de message pour le moment. Revenez plus tard !{' '}
			<span role="img" aria-label="Emoji souriant">
				🙂
			</span>
		</div>
	);

	const viewMessageList = (messageList) => (
		<div className="tchat">
			<div className="tchat__list">
				{messageList.length === 0 ? (
					emptyMessage
				) : (
					<div className="tchat__list__messages">
						{messageList.map((message) => viewMessage(message))}
					</div>
				)}
			</div>
			<form
				className="tchat__form"
				id="send-message-form"
				onsubmit={(event) => event.preventDefault()}
			>
				<div className="tchat__form__textarea">
					<textarea name="message" rows="1" placeholder="Entrez le message à envoyer ici." />
				</div>
				<div className="tchat__form__button">
					<button>Envoyer</button>
				</div>
			</form>
		</div>
	);

	return viewMessageList(model.messageList);
};
