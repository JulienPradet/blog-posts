Ainsi, dès cet instant, le navigateur sait que l'élément ne disparaît pas mais est simplement déplacé. Alors il va faire sa magie noir et le déplacer. 🎉

> **💡 Accessibilité :** Gardez en tête toutefois que des animations de la sorte peuvent donner la nausée à toute une partie de vos utilisateurices (par exemple celles et ceux atteint de [troubles vestibulaires](https://fr.wikipedia.org/wiki/Syndrome_vestibulaire)).
>
> A ce titre, il est préférable de désactiver les animations de transition quand la préférence "reduced motion" est activée dans le navigateur.
>
> Cela peut être fait de manière globale avec ces quelques lignes de CSS. AInsi, je vous conseille de l'ajouter dans vos `reset` dès aujourd'hui, plutôt que de l'oublier demain.
>
> ```css
> @media (prefers-reduced-motion: reduce) {
> 	* {
> 		view-transition-name: unset !important;
> 	}
> }
> ```

### Faire fonctionner document.startViewTransition dans un framework JS

> ➡️ **Si vous vous en moquez des frameworks JS**, [RDV à la section suivante](#utiliser-les-view-transitions-dans-un-cas-complexe-vue-liste-vers-vue-page). 😘

L'exemple ci-dessus est un exemple qui fonctionne en Vanilla JS. Cela dit, gardez en tête qu'il peut y avoir quelques subtilités en fonction du framework que vous utilisez. En effet, la plupart des frameworks font une tâche d'optimisation pour vous : quand vous mettez à jour votre `state`, il ne met pas à jour directement votre DOM. Il attend un petit peu pour faire toutes les modifications d'un coup. La conséquence, c'est que cette mise à jour vient trop tard et donc l'animation échoue.

L'astuce est donc de faire en sorte que la mise à jour soit synchrone ou, à défaut, d'attendre qu'elle soit finie.

#### `document.startViewTransition` en React

En React, pour faire une mise à jour synchrone, vous pouvez importer la méthode `flushSync` et entourer votre changement d'état par celle-ci.

```diff
+import { flushSync } from 'react-dom';

const [status, setStatus] = useState('closed');

function open() {
+	if ('startViewTransition' in document) {
+		document.startViewTransition(() => {
+			flushSync(() => {
+				 setStatus('opened');
+			});
+		});
+	} else {
		 setStatus('opened');
+	}
}
```

#### `document.startViewTransition` en Vue.js

Si vous modifiez la valeur d'une ref, le DOM sera mis à jour de manière synchrone. Vous pouvez donc utiliser document.startViewTransition sans plus de cérémonie.

```diff
+import { tick } from 'svelte';
const status = ref('closed');

function open() {
+	if ('startViewTransition' in document) {
+		document.startViewTransition(() => {
+			 status.value = 'opened';
+		});
+	} else {
		 status.value = 'opened';
+	}
}
```

#### `document.startViewTransition` en Svelte

En Svelte, la mise à jour est nécessairement asynchrone. Donc plutôt que de changer de mode, l'astuce est d'attendre la fin de la mise à jour asynchrone pour déclencher la transition. Pour cela, on va transformer le callback de startViewTransition pour qu'il soit asynchrone et [`await tick()`](https://svelte.dev/docs/svelte#tick) pour être sûr que la mise à jour est terminée.

```diff
let status = 'closed';

function open() {
+	if ('startViewTransition' in document) {
+		document.startViewTransition(async () => {
+			setStatus('opened');
+			await tick();
+		});
+	} else {
		 setStatus('opened');
+	}
}
```

## Utiliser les View Transitions dans un cas complexe (vue liste vers vue page)

Si je ne vous ai pas encore achevé avec mes explications, nous avons maintenant les bases de l'API des View Transitions. Mais, vous vous en doutez, on peut rapidement tomber dans des cas plus complexes. Pour mieux comprendre la magie qui se cache derrière les View Transitions, nous allons donc essayer d'animer la transition d'une liste vers un bandeau de header.

Cliquez sur un des chiffres ci-dessous pour simuler la vue page :
