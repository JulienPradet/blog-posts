<script lang="ts">
	let state = 'idle';
	let message: string;
	let name: string;
	let feedback: HTMLElement;

	function onSubmit(event: SubmitEvent) {
		const contactForm = event.target;
		if (!(contactForm instanceof HTMLFormElement)) {
			return;
		}

		event.preventDefault();

		state = 'loading';

		const formData = Array.from(new FormData(contactForm), ([key, value]) => [
			key,
			typeof value === 'string' ? value : value.name
		]);

		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams(formData).toString()
		})
			.then((response) => {
				if (response.ok) {
					state = 'success';
				} else {
					state = 'error';
				}
			})
			.catch((error) => {
				console.error(error);
				state = 'error';
			});
	}

	$: {
		if (state === 'error' || state === 'success') {
			if (feedback) {
				feedback.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
			}
		}
	}
</script>

<form name="contact" method="POST" data-netlify="true" on:submit={onSubmit}>
	<input type="hidden" name="form-name" value="contact" />
	<div>
		<label for="contact-name">Votre nom</label>
		<input
			id="contact-name"
			type="text"
			name="name"
			disabled={state === 'loading' || state === 'success'}
			bind:value={name}
		/>
	</div>
	<div>
		<label for="contact-email">Votre email</label>
		<p>Pas d'inquiétude, je ne l'utiliserai que dans le cadre de cet échange.</p>
		<input
			id="email"
			type="email"
			name="email"
			required
			disabled={state === 'loading' || state === 'success'}
		/>
	</div>
	<div>
		<label for="contact-message">Dîtes-moi tout</label>
		<p>
			Si vous préférez, n'hésitez pas à tout simplement demander un RDV en précisant le sujet que
			vous aimeriez aborder.
		</p>
		<textarea
			bind:value={message}
			id="contact-message"
			name="message"
			rows="5"
			required
			disabled={state === 'loading' || state === 'success'}
		></textarea>
	</div>
	<div>
		<p>Je ferai tout pour vous répondre dans la journée. 🏃‍♂️</p>
		{#if state === 'loading'}
			<button disabled type="submit">Ca charge...</button>
		{:else if state === 'success'}
			<button disabled type="submit">Envoyé ! 🤸‍♂️</button>
		{:else}
			<button type="submit">Envoyer</button>
		{/if}

		{#if state === 'error'}
			<div class="error" bind:this={feedback}>
				<p><strong>Je suis vraiment désolé, mais il y a eu une erreur.</strong></p>
				<p>
					Est-ce que vous pourriez soit réessayer, soit m'envoyer un email si l'erreur persiste ? 😬
				</p>
				<p>
					<a href={`mailto:julien.pradet+error@gmail.com?body=${encodeURIComponent(message)}`}
						>julien.pradet+error@gmail.com</a
					>
				</p>
			</div>
		{:else if state === 'success'}
			<div class="success" bind:this={feedback}>
				<p><strong>Merci beaucoup pour votre message{name ? ` ${name}` : ''}&nbsp;! 🎉</strong></p>
				<p>Je reviens vers vous dès que possible.</p>
			</div>
		{/if}
	</div>
</form>

<style>
	form {
		width: 100%;
		max-width: 32rem;
		margin-block: 3rem;
	}

	div + div {
		margin-top: 1rem;
	}

	label {
		display: block;
		font-weight: var(--weight-bold);
	}

	input,
	textarea {
		width: 100%;
		margin-top: 0.5rem;
		padding: 0.5rem 1rem;
		font: inherit;
		border-radius: 3px;
		border: 1px solid var(--color-dark-lighter);
	}
	input:focus,
	textarea:focus {
		outline: 2px solid rgb(207 58 0 / 100%);
		outline-offset: 2px;
		/* border-color: transparent; */
	}
	input:disabled,
	textarea:disabled {
		border-color: var(--color-border);
	}

	p {
		margin: 0;
	}

	button {
		width: 100%;
		padding: 0.5rem 1rem;
		font: inherit;
		color: white;
		font-weight: var(--weight-bold);
		background: rgb(207 58 0 / 100%);
		border: none;
		border-radius: 3px;
		margin-top: 1.5rem;
		cursor: pointer;
	}

	button:focus-visible {
		outline: 2px solid rgb(207 58 0 / 100%);
		outline-offset: 2px;
	}

	.error,
	.success {
		margin-top: 1.5rem;
		border: 1px solid rgb(207 58 0 / 100%);
		padding: 1rem;
		scroll-margin: 2rem;
	}
</style>
