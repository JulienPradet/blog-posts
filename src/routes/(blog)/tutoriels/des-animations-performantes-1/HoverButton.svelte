<div class="hover-button__wrapper">
	<button class="hover-button">Hover me!</button>
</div>

<style>
	.hover-button__wrapper {
		text-align: center;
	}
	.hover-button {
		transition: transform 0.3s ease, background 0.3s ease;
		background: #00c9c9;
		color: white;
		padding: 0.5em 2em;
		display: inline-block;
		text-align: center;
		font-size: 1.3em;
		font-weight: bold;
		border: 0;
	}
	.hover-button:hover,
	.hover-button:focus {
		transform: scale(1.2);
		background: #19e4e4;
	}
</style>
