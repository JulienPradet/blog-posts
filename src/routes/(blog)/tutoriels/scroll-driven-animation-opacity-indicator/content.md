L'autre jour je commençais à vous parler des Scroll Driven Animations en [animant un header sticky](/tutoriels/sticky-header-avec-hauteur-dynamique-performant/). Aujourd'hui on va continuer à explorer cette nouvelle techno CSS en l'utilisant comme indicateur.

Notamment, j'ai un truc qui m'embête régulièrement sur le web : comment est-ce que je suis censé savoir qu'un contenu est scrollable ou non. C'est un problème d'autant plus récurrent que les scrollbars ont tendance à disparaître, étant donné que sur mobile on cherche à tout prix à économiser de la place.

Pour résoudre ce problème, j'ai remarqué 3 types de solutions :

- **L'icone mystérieux :** un petit icone, parfois animé pour pousser les gens à regarder plus loin

    <figure tabindex="0">
    <img loading="lazy" src="/images/posts/scroll-indicator/icone-mysterieux.png" alt="Schema d'un carousel horizontal avec un bouton sur la droite pour indiquer qu'il y a plus d'éléments" width="672" height="228">
    </figure>

- **Le boucher du web :** on s'assure que le contenu suivant est partiellement visible pour indiquer qu'il y a en a plus

    <figure tabindex="0">
    <img loading="lazy" src="/images/posts/scroll-indicator/boucher-web.png" alt="Schema d'un carousel horizontal où le troisème élément est brutalement coupé" width="671" height="228">
    </figure>

- **Le dégradé mystérieux :** on gène légèrement la lecture avec un petit dégradé pour pousser à aller voir la suite sans avoir une coupure trop nette

    <figure tabindex="0">
    <img loading="lazy" src="/images/posts/scroll-indicator/degrade-mysterieux.png" alt="Schema d'un carousel horizontal où le troisème élément n'est pas entièrement visible et s'évanouit dans un dégradé blanc" width="671" height="228">
    </figure>

Aujourd'hui on va se concentrer sur cette 3ème solution pour laquelle les Scroll Driven Animations semblent être la solution idéale : uniquement en CSS et très fluide étant donné que ce n'est plus exécuté sur le [main thread](https://developer.mozilla.org/en-US/docs/Glossary/Main_thread).

> **Prérequis :** Avant de lire cet article, je vous conseille de lire le paragraphe [Comment fonctionne une Scroll Driven Animation](/tutoriels/sticky-header-avec-hauteur-dynamique-performant/#comment-fonctionne-une-scroll-driven-animation) : il présente le concept et pose les bases pour avoir un modèle mental de comment ça fonctionne. Seul ce paragraphe est vraiment obligatoire. Le reste de l'article (bien que très intéressant 😁) n'est pas nécessaire.

> **Attention :** A ce jour, ce que je vais vous présenter n'est disponible que sur les dernières versions de Chrome ([caniuse](https://caniuse.com/?search=animation-timeline)). Evitez donc de l'utiliser en production pour le moment ou à minima, pensez à utiliser `@supports (animation-timeline: view()) {}` pour éviter des mauvaises surprises sur les autres navigateurs.

## <abbr tabIndex="-1" title="Too long; Didn't read">TL;DR</abbr>

Vous pouvez accéder au code et à la démo ici : https://codepen.io/julienpradet/pen/gOqObbW

L'objectif est triple ici :

- animer l'opacité de chaque élément en fonction de sa position dans le scroll
- ne pas réduire l'opacité si on est tout en haut du scroll : étant donné que l'opacité réduite indique le reste à scroll, on veut qu'elle soit à 100% si on est tout en haut.
- idem quand on est tout en bas du scroll

Vous constaterez par ailleurs que je n'ai pas utilisé de dégradé et que je me suis contenté d'opacité parce que ça m'a eu l'air suffisant et plus joli. Mais le code pourrait être adapté si vous préférez un dégradé.

## 0. Structure générale de notre HTML

Pour cet exercice, nous faire un exemple minimaliste de chat avec une boîte qui est scrollable verticalement, et à l'intérieur de celle-ci une liste de messages.

```html
<div class="scroll-container">
	<p class="message me">Hey!</p>
	<p class="message you">Hey!</p>
	<p class="message me">What's up?</p>
	<p class="message you">All good, you?</p>
	<p class="message me">All good.</p>
</div>
```

```css
.scroll-container {
	max-height: 500px;
	overflow-y: auto;
}

.message {
	padding: 1rem;
	background: var(--color-primary);
}
```

## 1. Définir l'opacité en fonction de la position d'un élément

Une fois la structure de base prise en compte, nous allons commencer à faire changer l'opacité en fonction de la position de l'élément dans l'écran.

```css
.message {
	animation: y-distribution; /* 2 */
	animation-timeline: view(); /* 1 */
}

@keyframes y-distribution {
	0% {
		opacity: 0.3; /* 3 */
	}

	25% /* 4 */ {
		opacity: 1;
	}

	/* 5 */
	75% {
		opacity: 1;
	}

	100% {
		opacity: 0.3;
	}
}
```

1. `animation-timeline` permet de savoir quel genre d'animation on souhaite effectuer. Quand on pense Scroll Driven Animation, on va avoir tendance à penser à `animation-timeline: scroll()` qui permet de dire : si on est tout en haut du scroll, l'animation est à 0%, et tout en bas, à 100%. Mais ici, ce qui nous intéresse ce n'est pas l'opacité du premier et du dernier élément de **tout le scroll**, mais uniquement le premier et le dernier élément **visible**. C'est pour ça qu'on utilise [`animation-timeline: view()`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view)
2. on choisit quelle animation executer : en l'occurrence ce sera `y-distribution` qui se définit avec `@keyframes` comme pour une animation normale.
3. on ne veut pas complètement cacher le premier élément, donc on part de 0.3 quand il est tout en haut de la partie visible
4. Puis on le rend totalement visible à partir de 25%. Ce pourcentage dépend de la hauteur de votre scroll-container : s'il est trop bas, vous risquez de tomber dans des situations où l'opacité n'est pas du tout appliquée ; s'il est trop haut, tous vos messages seront en opacité réduite.
5. Puis on refait la même chose dans le sens inverse : plus on est proche du bas, plus l'opacité est réduite

<iframe height="600" style="width: 100%;" scrolling="no" title="Scroll container indicator: scroll driven animations - Step 1" src="https://codepen.io/julienpradet/embed/yLZGBeM?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/julienpradet/pen/yLZGBeM">
  Scroll container indicator: scroll driven animations - Step 1</a> by Julien Pradet (<a href="https://codepen.io/julienpradet">@julienpradet</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Ca fonctionne à merveille, mais on a pour l'instant juste une animation d'entrée et de sortie : si on est tout en haut, le premier message est à 0.3 d'opacité et donc peu lisible.

## 2. Prendre en compte la proximité avec le haut du scroll

Nous allons donc devoir adapter notre CSS pour s'assurer que l'opacité est de 1 quand on est tout en haut du scroll.

Le CSS pourrait alors ressembler à ça :

```css
@property --min-opacity {
    syntax: "<number>";
    inherits: true;
    initial-value: 1;
}

@keyframes top-proximity; {
	0% {
		--min-opacity: 1; /* 3 */
	}

	100% {
		--min-opacity: 0;
	}
}

.message {
	animation: top-proximity;
	animation-timeline: scroll(); /* 1 */
    animation-range: 0% 3rem; /* 2 */
}
```

1. Ce qui nous intéresse c'est la hauteur totale du scroll, donc on repasse à une `animation-timeline: scroll()`
2. On ne peut plus faire notre `@keyframes` sur toute la hauteur du scroll : sinon, quand on a 100 messages, l'animation met trop de temps à se jouer sur le scroll. On ajoute donc une `animation-range: 0% 3rem` pour indiquer que l'animation se jouera uniquement sur 3rem de hauteur. Ainsi, l'animation est à 0% si on est tout en haut, 50% si on a scrollé 1.5rem, 100% si on a scrollé 3rem et plus.
3. Pendant l'animation, on va faire évoluer la propriété `--min-opacity` : si on est tout en haut, alors on ne devrait pas diminuer l'opacité en lui définissant un minimum de 1 ; sinon, elle peut évoluer normalement (donc pas de minimum en la mettant à 0)
4. Pour que cette propriété CSS soit animable, on doit définir au navigateur comment l'animer : on anime pas de la même façon un nombre et une couleur. C'est pour cette raison qu'on aide le navigateur en définissant une `@property`

C'est bien beau tout ça, mais si on met à jour notre code, ça ne marche plus : en effet, on a retiré l'animation initiale et le `--min-opacity` n'est utilisée nulle part.

Nous allons donc devoir combiner les 2 méthodes ensemble. Pour ce faire, nous pouvons chaîner les animations dans `animation-timeline` et `animation-range` en les séparant par des virgules.

```css
/* 1 */
@property --opacity {
    syntax: "<number>";
    inherits: true;
    initial-value: 1;
}

@property --min-opacity {
    syntax: "<number>";
    inherits: true;
    initial-value: 1;
}

@keyframes top-proximity; {
	0% { --min-opacity: 1; }
	100% { --min-opacity: 0; }
}

@keyframes y-distribution {
	0% { --opacity: 0.3; }
	25% { --opacity: 1; }
	75% { --opacity: 1; }
	100% { --opacity: 0.3; }
}

.message {
	animation:
        y-distribution,
        top-proximity;
	animation-timeline:
        view(),
        scroll();
    animation-range:
        normal,
        0% 3rem;
    /* 2 */
    opacity: max(--min-opacity, --opacity);
}
```

1. Plutôt que d'animer l'`opacity` dans l'animation `y-distribution` on va préférer mettre à jour une nouvelle @property qu'on va appeler `--opacity`
2. Cela nous permet ainsi de calculer l'`opacity` finale à partir de `--min-opacity` et `--opacity`

<iframe height="600" style="width: 100%;" scrolling="no" title="Scroll container indicator: scroll driven animations - Step 2" src="https://codepen.io/julienpradet/embed/yLZGBOb?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/julienpradet/pen/yLZGBOb">
  Scroll container indicator: scroll driven animations - Step 2</a> by Julien Pradet (<a href="https://codepen.io/julienpradet">@julienpradet</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Cette fois-ci, le résultat est meilleur : si on est tout en haut le premier message est entièrement visible. Si on commence à scroller, les messages du haut voient leur opacité diminuer.

## 3. Prendre en compte la proximité avec le bas du scroll

Cependant, nous avons un problème : quand on est tout en haut, le dernier message visible est lui aussi complètement visible. C'est un problème parce qu'au tout début du scroll, on ne voit plus qu'il y a une suite.

Nous allons donc voir comment utiliser la proximité avec le haut **et** avec le bas. Pour cela, nous allons devoir reproduire ce qu'on a fait pour le `top-proximity` mais cette fois ci avec un `bottom-proximity`.

```css
@keyframes top-proximity; {
	0% { --min-opacity: 1; }
	100% { --min-opacity: 0; }
}

@keyframes bottom-proximity; {
	0% { --min-opacity: 1; }
	100% { --min-opacity: 0; }
}

@keyframes y-distribution {
	0% { --opacity: 0.3; }
	25% { --opacity: 1; }
	75% { --opacity: 1; }
	100% { --opacity: 0.3; }
}
```

Cependant, `top-proximity` et `bottom-proximity` rentrent en conflit, on ne sait pas vraiment lequel doit gagner. On va donc plutôt les renommer en `--top-min-opacity` et `--bottom-min-opacity` et en fonction de où on est dans le scroll, on va utiliser soit l'un, soit l'autre.

Si nous étions en JavaScript, nous pourrions faire une condition qui ressemblerait à :

<!-- prettier-ignore -->
```css
.message {
	opacity: max(
        var(--opacity),
        /* Ceci ne fonctionne pas */
        var(--is-top) ? var(--top-min-opacity): var(--bottom-min-opacity)
    );
}
```

Mais nous ne sommes pas en JS. Donc comment transformer ça en utilisant uniquement des calculs ?

L'astuce est de constater qu'une `min-opacity` qu'on veut ignorer devrait être à `0`. En effet, `max(0, var(--opacity)) === var(--opacity)`.

De fait, si on veut ignorer `--top-min-opacity` quand on est dans la partie basse de l'écran, il faut alors la multiplier par `0`. Si on est dans la partie haute, on peut la conserver à sa valeur initiale et donc la multipler par `1`.

Ceci nous donne : `--min-opacity: calc(var(--is-top) * var(--min-top-opacity))` avec `--is-top: 0` dans la partie haute, et `--is-top: 1` dans la partie basse.

Conceptuellement c'est exactement comme si nous avions écrit : `--min-opacity: var(--is-top)? var(--top-min-opacity): 0`.

Inversement, si on est en haut on devrait multiplier `--min-bottom-opacity` par `0`, et par `1` si on est en bas. Autrement dit, on peut multiplier par l'inverse: `1 - var(--is-top)`.

Ce qui nous donne: `--min-opacity: calc((1 - var(--is-top)) * var(--min-bottom-opacity))`

Enfin, pour prendre les deux en compte en même temps, on peut faire la somme des 2 : quand `--is-top` vaudra `0`, c'est le `--min-bottom-opacity` qui gagnera, quand il vaudra `1` c'est le `--min-top-opacity`.

Ca nous donne la formule suivante :

<!-- prettier-ignore -->
```css
.message {
	--min-opacity: var(--is-top) * var(--top-min-opacity)
        + (1 - var(--is-top)) * var(--bottom-min-opacity);

	opacity: max(var(--opacity), var(--min-opacity));
}
```

> 💡 **Astuce :** La bonne nouvelle c'est que cette méthode marche avec un nombre infini d'indicateurs : en effet, plutôt que de faire `1 - var(--is-top)` vous auriez pu créer un nouveau `--is-bottom`. Donc en appliquant cette technique, vous pourriez aller jusqu'à implémenter un switch en CSS.

Maintenant la question est : comment définir ce `--is-top` ? En réutilisant nos `@keyframes` :

```diff
+@property --is-top {
+    syntax: "<number>";
+    inherits: true;
+    initial-value: 1;
+}

@keyframes y-distribution {
	0% { --opacity: 0.3; }
	25% { --opacity: 1; }
+	50% { --is-top: 1; }
+	51% { --is-top: 0; }
	75% { --opacity: 1; }
	100% { --opacity: 0.3; }
}
```

Et voila! Nous avons maintenant un comportement de scroll qui :

- diminue l'opacité quand `.message` est au bord de la vue
- sauf si on est tout en haut du scroll
- ou si on est tout en bas du scroll

<iframe height="600" style="width: 100%;" scrolling="no" title="Scroll container indicator: scroll driven animations - Step 3" src="https://codepen.io/julienpradet/embed/VwgqZjg?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/julienpradet/pen/VwgqZjg">
  Scroll container indicator: scroll driven animations - Step 3</a> by Julien Pradet (<a href="https://codepen.io/julienpradet">@julienpradet</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Conclusion

Ainsi, on sait toujours quand il y a plus de contenu cacher derrière le scroll et surtout c'est très léger pour le navigateur vu que c'est fait uniquement en CSS. Attention toutefois à garder en tête que ce n'est disponible que sur les Chromium pour l'instant, mais que ce standard se répandre au fur et à mesure.

Si vous en avez besoin dès aujourd'hui, sûrement qu'une alternative JS sera plus pertinente. (ex: [GSAP](https://gsap.com/scroll/))

Et vous, vous auriez fait comment ? Je serais curieux d'en savoir plus.

En tout cas, si c'est le genre de choses qui vous intéressent, n'hésitez pas à me suivre et à partager autour de vous. Je publie régulièrement des articles autour de la performance et du développement web. A très vite 😘
