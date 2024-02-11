<script lang="ts">
	import Headline from '../../../../components/Headline.svelte';
	import MainContent from '../../../../components/MainContent.svelte';
	import Content from '../../../../components/Content.svelte';
	import Prism from '../../../../components/Prism.svelte';
	import { html as intro } from './intro.md';
	import { html as part1 } from './part1.md';
	import { html as part2 } from './part2.md';
	import { html as part3 } from './part3.md';
	import { html as part4 } from './part4.md';
	import { html as part5 } from './part5.md';
	import { html as part6 } from './part6.md';
	import { html as part7 } from './part7.md';
	import { html as code } from './code.md';
	import FollowIncentive from '../../../../components/FollowIncentive.svelte';
	import Meta from '../../../../components/Meta.svelte';
	import meta from './meta';
	import ToggleNoAnimation from './ToggleNoAnimation.svelte';
	import Toggle from './Toggle.svelte';
	import ToggleOpacity from './ToggleOpacity.svelte';
	import Demo from '../../../../components/Demo.svelte';
	import ListToHeaderNoAnimation from './ListToHeaderNoAnimation.svelte';
	import ListToHeaderWeirdScale from './ListToHeaderWeirdScale.svelte';
	import ListToHeader from './ListToHeader.svelte';
	import ChangeImage from './ChangeImage.svelte';
	import ChangeImageStableImage from './ChangeImageStableImage.svelte';
</script>

<Meta {meta} location="/tutoriels/view-transitions/" />

<Headline headline={meta.title} subtitle="lundi 06 février 2024" />

<MainContent>
	<Content>
		<Prism>
			{@html intro}
			<Demo standby={false}><ToggleNoAnimation /></Demo>
			{@html part1}
			<Demo standby={false}><ToggleOpacity /></Demo>
			{@html part2}
			<Demo standby={false}><Toggle /></Demo>
			{@html part3}
			<Demo standby={false}><ListToHeaderNoAnimation /></Demo>
			{@html part4}
			<Demo standby={false}><ListToHeaderWeirdScale /></Demo>
			{@html part5}
			<Demo standby={false}><ListToHeader /></Demo>
			{@html part6}

			<details>
				<summary
					><strong
						>Pourquoi est-ce qu'à l'animation de mon image, j'ai un flash blanc disgracieux ?</strong
					> (Cliquez pour voir la réponse)</summary
				>

				<p>
					Si vous cliquez sur le bouton "Agrandir" avec un réseau qui est suffisamment lent,
					l'animation n'aura pas le comportement que vous espérez : la première version de l'image
					(petite) fera un fade out, puis pendant quelques (milli)secondes, il ne s'affichera rien,
					et enfin, quand la nouvelle image (grande) aurai fini de se charger, elle apparaîtra aussi
					sec.
				</p>

				<Demo standby={false}><ChangeImage /></Demo>

				<p>
					Dès que vous commencerez à manipuler des images dans les View Transitions, ce comportement
					arrivera. En effet, vous avez des contraintes très différentes entre vos différentes
					pages. Par exemple, sur une vue liste, il vous faudra peut être une image en 300x300 et
					sur la vue pleine page, il vous faudra du 1920x600 sur desktop.
				</p>

				<p>
					Dans la plupart des démos que j'ai vu passer, le partie pris est de charger une image
					suffisamment grande pour que ce soit la même URL d'image sur la liste ET sur la page.
				</p>

				<p>
					C'est désastreux pour l'expérience de navigation si vous n'avez pas une connexion fibrée
					parce que votre liste mettra trop de temps à se charger.
				</p>

				<p>A la place, vous avez deux options :</p>

				<ul>
					<li>
						Vous pouvez précharger l'image quand vous anticipez que la prochaine action risque
						d'être l'ouverture de la page (par exemple : si on a un mouseover ou un focus sur
						desktop, ou si on a un IntersectionObserver suffisamment long sur mobile). Ainsi, le
						preload permet d'ajouter la grande image en cache et donc de l'avoir à disposition au
						moment où on déclenche la transition. La probabilité pour que la grande image n'ait pas
						le temps d'être téléchargée est beaucoup plus faible, et la plupart des personnes
						n'auront pas de flash.
					</li>
					<li>
						<p>
							Ou bien, toujours commencer par afficher la page avec la petite image. Ainsi, pendant
							la transition, c'est exactement la même image qui est affichée (la petite), et pendant
							que la transition se joue, vous commencez à télécharger la grande image afin de
							l'afficher qu'à partir du moment où vous avez fini de la télécharger. Voici,
							ci-dessous, ce que ça donnerait :
						</p>

						<Demo standby={false}><ChangeImageStableImage /></Demo>

						{@html code}
					</li>
				</ul>
			</details>

			{@html part7}
		</Prism>
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
