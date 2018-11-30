L'autre jour, on m'a demandé comment je faisais pour préparer une conférence. Peu de temps après on m'a demandé comment j'écrivais des articles. Dans les deux cas, j'ai été un peu pris au dépourvu. Je n'ai jamais vraiment réfléchi à une technique ou à une procédure à mettre en place. D'ailleurs, j'ai souvent entendu dire que c'est très personnel et que c'est à chacun de trouver sa voie&sdot;x.

Pourtant, je constate que plus je prépare des conférences, plus j'écris des articles, plus j'ai une liste informelle de points que j'essaye de prendre en compte lors de la préparation de ceux-ci.

Je vais donc essayer de vous formaliser un petit peu cette liste. Je n'ai pas la science infuse, ni une grande expérience dans le domaine. Mais avec un peu de chance, elle sera utile à quelqu'un.

A noter que dans cet article je vais plutôt discuter de ma façon de prépare des articles ou des conférences _techniques_.

## Comment je choisis mon sujet

Avant d'attaquer l'écriture d'une conférence ou d'un article, je dois d'abord clairement définir de quoi j'ai envie de parler.

Parfois, cela vient assez naturellement. Par exemple, au travail, il m'arrive souvent de poser des questions ou répondre aux questions de mes collègues. C'est une excellente matière première&nbsp;: _Comment ça marche RxJS ?_, _C'est quoi un HOC ?_, _Pourquoi est-ce que les animations sur le web sont peu performantes ?_, etc.

Mais en général, c'est assez difficile. C'est le cas notamment quand j'essaye de répondre à un <abbr title="Call For Papers">CFP</abbr>. J'isole rapidement de quoi j'ai envie de parler (_PWA_, _Animations_, _React_, etc.), parce que je m'oriente vers les sujets que je maîtrise un minimum. Mais je ne peux pas décemment prétendre aborder la totalité du sujet en un seul article ou une seule conférence. Je vais donc essayer de diminuer le champ d'application. Je vais proposer à celles et ceux qui sont intéressés de venir voir comment je travaille et pourquoi je fais mes choix.

Par exemple, plutôt de parler de comment faire des animations, je vais me contenter de raconter comment je les fais. Pour cela, j'énumère mentalement tout ce que j'associe aux animations (un brainstorming, quoi)&nbsp;:

1.  La première fois que j'ai animé un truc, c'est quand je me suis amusé à animer des emoticones
2.  Quand j'ai commencé à faire du Web, j'ai utilisé du CSS avec `transition`
3.  J'ai utilisé `fadeIn`/`fadeOut`/etc. de jQuery aussi
4.  Mais je ne pouvais pas faire tout ce que je voulais. Je suis passé à du JS pur. J'ai appris à utiliser `requestAnimationFrame`
5.  Mais mes animations ne tournaient pas sur mobile. On m'a dit qu'il ne fallait utiliser que `transform` et `opacity`. Ca a marché ¯\\_(ツ)_/¯
6.  Depuis, je fais beaucoup de React mais peu d'animations sur des vrais projets. En tout cas `react-motion`, ça a l'air cool.
7.  L'autre jour j'ai vu passer une animation dribble trop cool. Ca avait l'air difficile à faire sur le web.
8.  ...

Pour moi, le plus difficile est de sortir la première idée. En effet, au début, ce qu'il y a dire est tellement vaste que je m'y perd (quelque soit mon niveau de compétence sur le sujet). Cependant, dès que j'ai réussi à sortir un premier point, la suite vient par rebond. Telle idée me fait penser à une autre idée, qui me fait elle même penser à quelque chose d'autre, etc. La liste devient rapidement infinie.

Ensuite, une fois que j'ai listé tous ces points, je cherche à comprendre pourquoi ça m'est venu à l'esprit. Pourquoi ça m'intéresse&nbsp;? A quelle question ai-je essayé de répondre à l'époque&nbsp;? Comment est-ce que cela a pu m'influencer sur ma façon de travailler aujourd'hui&nbsp;? Est-ce quelque chose que j'ai envie d'approfondir&nbsp;? Ca pourrait être une bonne excuse d'écrire un article dessus... De ces questions ressort une nouvelle liste de questions&nbsp;:

- Comment passer de deux images fixes à une animation ? (1, 2, 3)
- Comment orchestrer une animation pour la rendre fluide ? (4)
- Comment est-ce qu'un navigateur affiche du HTML/CSS ? (5)
- Comment faire une animation performante ? (4, 5)
- Quels outils utiliser pour quelles animations ? (6)
- Comment réaliser telle animation avec tel outil ? (6)
- Comment depuis la maquette il a fallu adapter l'animation à l'implémentation ? (7)

Et _tada_&nbsp;! J'ai une liste de sujets à explorer. Certains peuvent parître _trop_ précis. Mais il y a souvent des choses à creuser derrière chaque question. C'est d'ailleurs ces instants de fouille qui sont souvent les plus intéressants&nbsp;! Du coup, plus un sujet est précis, plus je suis content.

## Comment j'aborde le sujet

Une fois que le sujet est vaguement défini, je commence par le retravailler pour avoir une ligne directrice. En effet, une question peut souvent être répondue en plusieurs points.

J'essaye de faire une progression. Comment je suis arrivé à connaître ça. Quelles sont les embûches et comment je fais pour les contourner.

- Importance du plan pour annoncer ce qu'on a prévu d'écrire
- Toujours commencer par le problème parce qu'une solution sans problème ne résoud rien
- Si pas de progression ni fil conducteur, le lecteur/spectateur s'ennuit.
- Jalons de compréhension
- Les parties sont jetables. Il n'est pas toujours pertinent d'aborder tous les détails. D'autant que les détails pourront être utilisés pour faire d'autres articles où vous aurez tout le temps de les développer

## Dans la forme

- Pour les articles techniques/explicatifs, on est ensemble dans la même galère
- Pour les parties particulièrement personnelles, le mettre en évidence avec le "je". Ca ne sert à rien de faire croire (ou de se convaincre soit même) que c'est une règle universelle.
- Rien n'est facile. Tout est question d'expérience. Proposer de répondre aux questions régulièrement. Ce n'est pas grave d'être chiant à ce sujet là. Proposer plusieurs méthodes d'échange.
- Identifier les défauts de langages (ca saute aux yeux des autres gens) : j'écris tout le temps _Ainsi_, _En effet_ et _permet de_, je dis tout le temps _truc_ et _machin_.
- Mon défaut : phrases trop longues. Mais je ne me force pas au début : si je commence par faire du trop parfait, je bloque et je n'arrive jamais à finir. C'est plus facile de commencer par du nul et finir par du moins pire.
- Eviter les mots compliqués - ou en tout cas toujours les accompagner d'une explication précise de ce que je veux vraiment dire. Les mots compliqués font intelligents et sont un bons raccourcis vers une notion, mais sont très souvents compris différemment par les personnes. (excentrique)
- Identifier les éléments vagues qui sont censés s'expliquer tout seuls et reformulant en partant de l'explication.

## Comment je fais pour faire mieux

- Importance du feedback
  - Pas toujours évident à prendre en compte. Mon premier réflexe est d'expliquer pourquoi j'ai fait ce choix. Même si ça peut être utile pour trouver ce qui ne va pas, c'est pas toujours le bon réflexe parce qu'on se mure dans l'existant et pas vraiment dans ce qui pourrait être mieux. Les rares fois où je me suis dit que je ne prendrai pas en compte le feedback, qqu d'autre est venu me voir pour me dire la même chose : il y avait vraiment qqch qui pouvait être mieux fait.
- On a pas toujours de feedback :
  - revenir sur ce qu'on a écrit il y a quelque temps, le lire pour ce qui était bien et moins bien. Avec un oeil neuf, ca saute aux yeux quand une partie est moins claire
  - lire d'autres articles (de tout horizon et pour tous les niveaux)
  - répondre aux gens qui vous contactent et ne pas hésiter à demander des précisions. Au pire ils ne répondront pas. Au mieux vous aurez matière pour la suite.
  - réviser/relire 10 fois. Faire une pause d'une semaine et recommencer.

## Conclusion
