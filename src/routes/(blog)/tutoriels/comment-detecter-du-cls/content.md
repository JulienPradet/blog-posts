Dans le domaine de la Web Performance, il y a plusieurs aspects à prendre en compte :

- Est-ce que ma page s'affiche rapidement ?
- Est-ce que la rapidité à laquelle elle se charge permet à une personne d'interagir facilement avec elle ?
- Est-ce que les interactions sont rapides ?

Jusqu'à maintenant dans les articles que j'ai publié autour de la performance, j'ai beaucoup parlé du premier point. Nous nous sommes surtout concentrés sur celui-ci parce que le [Largest Contentful Paint](/tutoriels/pourquoi-ameliorer-le-lcp/#qu-est-ce-que-le-lcp-et-pourquoi-s-y-interesser) est certainement la métrique la plus générique et la plus évidemment impactante pour nos utilisateurices : s'il faut attendre 10 secondes pour voir le contenu, la page est évidemment lente.

Cependant, aujourd'hui je vais vous parler du deuxième aspect : comment gérer le chargement de ma page pour améliorer la performance ressentie ? Notamment, avec l'avènement des [Core Web Vitals](https://web.dev/vitals/#core-web-vitals) poussées par Google, la métrique qui va nous intéresser est le [Cumulative Layout Shift (CLS)](https://web.dev/cls/).

Si vous voulez en savoir plus sur la Web Performance, n'hésitez pas à jeter un coup d'œil aux autres articles suivants. Si vous n'avez pas le temps de vous former à ces sujets ou que vous devez améliorer vos performances avant une date clé, sachez aussi que je peux venir en renfort dans vos équipes afin de mener [audit, correctifs ou formation](/developpeur-web-performance/).

- [Pourquoi améliorer le LCP de vos pages ?](/tutoriels/pourquoi-ameliorer-le-lcp/)
- [Analyser le comportement réseau pour améliorer FCP et LCP](/tutoriels/reseau-et-core-web-vitals/)
- [Optimiser les images sur le web : checklist des bonnes pratiques](/tutoriels/optimiser-le-chargement-des-images/)
- [Optimiser le chargement des fonts](/tutoriels/optimiser-le-chargement-des-fonts/)
- [Optimiser la gestion des icônes](/tutoriels/optimiser-le-chargement-des-icones/)
- Comment diagnostiquer et corriger du CLS ? **(vous êtes ici)**
  - [Qu’est-ce que le CLS ?](#qu-est-ce-que-le-cls)
  - [Quels outils pour mesurer et diagnostiquer le CLS ?](#quels-outils-pour-mesurer-et-diagnostiquer-le-cls)
  - [Correction du CLS](#correction-du-cls)
  - [Récapitulatif](#recapitulatif)
- Quelles techniques pour diminuer la quantité de JavaScript ? (bientôt)
- Quelles métriques suivre en dehors des Core Web Vitals ? (bientôt)
- Et plus encore 🫶

## Qu'est-ce que le <abbr tabIndex="-1" title="Cumulative Layout Shift">CLS</abbr> ?

Pour comprendre ce qu'est le CLS, je vous propose d'essayer de cliquer sur le bouton "Revenir à l'article" de la vidéo suivante ou en allant directement sur la [démo](/examples/webperf/slow-cls.html).

<figure>
<video controls>
  <source src="/images/posts/cls/cls.webm" type="video/webm" />
  <source src="/images/posts/cls/cls.mp4" type="video/mp4" />
</video>
<figcaption>Video du chargement de la <a href="https://www.julienpradet.fr/examples/webperf/slow-cls.html">page d'exemple</a> sur mobile</figcaption>
</figure>

Si vous cliquez au mauvais moment, vous ne cliquerez pas sur le bouton, mais sur le titre. C'est déjà frustrant en soit. Mais si le titre était un autre lien, vous vous seriez retrouvé brinquebalé sur une autre page. C'est par exemple le cas sur l'application Webtoon où je lis régulièrement. Quand j'arrive sur la liste des chapitres d'une série, je m'apprête à ouvrir le dernier chapitre (ici le 91), et à _chaque fois_, l'encart "Daily Pass" apparaît pile au moment où je clique (cf. deuxième onglet). Je me retrouve alors à cliquer sur "Read the latest 3 episodes" au lieu de cliquer sur l'épisode 91, ce qui m'ouvre une dropdown et m'oblige à faire plein de clics supplémentaires pour arriver à mon but. 😩
