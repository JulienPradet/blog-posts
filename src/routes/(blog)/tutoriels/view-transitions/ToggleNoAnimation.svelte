<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	let isChecked = false;

	const changePosition = (target: EventTarget & HTMLInputElement) => {
		isChecked = target.checked;
	};

	const staticChangePosition: ChangeEventHandler<HTMLInputElement> = (event) => {
		changePosition(event.currentTarget);
	};
</script>

<ul>
	<li>
		<input
			type="checkbox"
			id="demo-1-is-checked"
			on:change={staticChangePosition}
			checked={isChecked}
		/>
		<label for="demo-1-is-checked">Déplacer à droite</label>
	</li>
</ul>

<div class={`container ${isChecked ? 'checked' : ''}`}>
	<p class="element">Element</p>
</div>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		margin-top: 0;
		padding: 0;
		user-select: none;
	}
	li {
		display: flex;
	}
	label {
		user-select: none;
	}

	.element {
		width: fit-content;
		margin-bottom: 0;
		padding: 1rem;
		color: white;
		background: var(--color-primary);
	}

	.checked .element {
		margin-left: auto;
	}
</style>
