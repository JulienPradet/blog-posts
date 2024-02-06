<script lang="ts">
	import { tick } from 'svelte';
	import type { ChangeEventHandler } from 'svelte/elements';

	let isChecked = false;

	const changePosition = (target: EventTarget & HTMLInputElement) => {
		isChecked = target.checked;
	};

	const animateChangePosition: ChangeEventHandler<HTMLInputElement> = (event) => {
		const target = event.currentTarget;
		if ('startViewTransition' in document) {
			document.startViewTransition(async () => {
				changePosition(target);

				await tick();
			});
		} else {
			changePosition(target);
		}
	};
</script>

<ul>
	<li>
		<input
			type="checkbox"
			id="demo-3-is-checked"
			on:change={animateChangePosition}
			checked={isChecked}
		/>
		<label for="demo-3-is-checked">Déplacer à droite</label>
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
		view-transition-name: element;
	}

	.checked .element {
		margin-left: auto;
	}
</style>
