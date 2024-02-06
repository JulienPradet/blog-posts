<script lang="ts">
	import { tick } from 'svelte';
	import type { ChangeEventHandler } from 'svelte/elements';

	let isChecked = false;

	async function updateDom(checked: boolean) {
		isChecked = checked;
		await tick();
	}

	const changePosition: ChangeEventHandler<HTMLInputElement> = (event) => {
		const checked = event.currentTarget.checked;
		if ('startViewTransition' in document) {
			document.startViewTransition(async () => {
				await updateDom(checked);
				console.log('HEREEEE update done', document.querySelector('.checked'));
			});
		} else {
			updateDom(checked);
		}
	};
</script>

<input type="checkbox" id="demo-2-is-checked" on:change={changePosition} checked={isChecked} />
<label for="demo-2-is-checked">Activer changement de position</label>

{isChecked ? 'checked' : 'NOOO'}
<div class={`container ${isChecked ? 'checked' : ''}`}>
	<p>Element</p>
</div>

<style>
	p {
		width: fit-content;
		margin-bottom: 0;
		padding: 1rem;
		color: white;
		background: var(--color-primary);
		view-transition-name: element;
	}

	.checked p {
		margin-left: auto;
	}
</style>
