<script lang="ts">
	let canvas: HTMLCanvasElement;

	function onBack() {
		window.history.back();
	}
</script>

<canvas bind:this={canvas}></canvas>
<div class="container">
	<div class="explanation">
		<h1>404 Void&nbsp;Found</h1>
		<p>Déso, j'ai raté mon lien 😬</p>
		<div class="actions">
			<button on:click={onBack}>Revenir en arrière</button>
			<a href="/">Aller à l'accueil</a>
		</div>
	</div>
</div>

<style>
	canvas {
		position: fixed;
		inset: 0;
	}
	.container {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		height: 100vh;
		height: 100dvh;
		padding-bottom: 20vh;
	}

	.explanation {
		padding: 1rem;
		text-align: center;
		font-size: max(1.5rem, calc(0.9rem + 2.5vw));
		line-height: 1.5;
	}

	h1 {
		margin: 0;
		font-size: max(3rem, calc(1.8rem + 5vw));
		line-height: 1.1;
	}

	p {
		margin: 0.5rem 0 0 0;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.25rem 1rem;
		margin-top: 0.5rem;
	}

	button,
	a {
		display: block;
		padding: 0;
		font: inherit;
		color: rgb(207 58 0);
		font-weight: var(--weight-black);
		font-size: max(1rem, calc(0.9rem + 0.5vw));
		text-align: center;
		background: none;
		border: 0;
		text-decoration: none;
		cursor: pointer;
	}
</style>
