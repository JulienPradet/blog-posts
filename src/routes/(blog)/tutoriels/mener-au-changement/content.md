Aujourd'hui je vais vous partager quelque chose de différent de d'habitude. Vous n'aurez pas d'exemple de code ni de présentation d'une librairie qui vous veut du bien. J'espère que vous en retirerez quand même quelque chose que vous pourrez appliquer dès demain dans votre boulot.

Je vais vous parler de mon expérience à [SINGULART](https://www.singulart.com/). Plus particulièrement je vais me concentrer sur ce qui s'est passé ces deux dernières années qui a permis de faire évoluer la codebase, donner plus d'autonomie à l'équipe front et améliorer notre efficacité au quotidien.

Pour mieux comprendre le contexte, SINGULART est une galerie d'art en ligne, une espèce de marketplace pour des artistes curatés (= sélectionnés). Cela rend le domaine métier particulier, mais au niveau du code on est très proche d'un e-commerce relativement classique.

Je parlerai plus en détail de mon rôle et de ce que j'ai constaté au quotidien. Ce qui a marché ou n'a pas marché. Il s'agit principalement d'un retour d'expérience et des leçons que j'en ai tiré. Cependant, gardons en tête que chaque situation est différente et que tout ne sera pas forcément applicable à la vôtre. N'hésitez donc pas à piocher et à l'adapter à votre contexte.

De plus, rien n'est possible en restant seul dans son coin. C'est un travail d'équipe à tous les niveaux et même si je parle de _mon_ expérience, c'est le cumul de plein de facteurs qui ont rendu cela possible .

## Situation initiale

Je débarque à SINGULART en avril 2021, en tant que premier développeur purement front-end (même si je me considère comme un full-stack sur pas mal de sujets 😁). Un an plus tôt, l'entreprise a fait une levée de fond de 10M € et en novembre 2021 fera une levée de 60M€. La taille de l'équipe tech, elle, a mis beaucoup de temps à grandir comparé au reste de l'entreprise. Lors de mes entretiens, pour environ 80 personnes il y avait 3-4 développeurs.

Une grande majorité de l'intégration avant mon arrivée est faite en HTML/Less par le graphiste freelance qui est présent depuis le début de l'aventure. L'intégration n'est pas sa spécialité mais ça permet de bien avancer le travail. C'est ensuite repris par les développeurs back/full-stack. A cette occasion, le code est transformé en Twig pour y ajouter les variables qui vont bien et générer les pages au sein de Symfony. On ajoute une petite couche de jQuery là où on en a besoin et ça part en prod.

Cette méthode a très bien fonctionné pendant 3 ans, notamment parce que ça permettait d'avancer sur les projets, tester des nouvelles choses et évolutions rapidement. C'est certainement une des raisons du succès. Cela dit, chaque étape du projet a ses propres complexités.

Notamment l'objectif après la levée de fond est de faire monter l'équipe technique à ~30 personnes en deux ans. Cependant, avec une telle croissance ça commence à avoir ses désavantages :

- Si on ne connaît pas bien le scope du projet, il est difficile de savoir quelle modification impacte quelle page. Et tant de nouvelles têtes, pas grand monde connaît le scope du projet.
- Très peu de réutilisation possible avec du code copié/collé entre les pages : sans bien connaître le projet, il est difficile de savoir comment réutiliser sans casser ce qui se passe à côté
- D'un point de vue purement technique, ce n'est pas très vendeur, on doit réapprendre pas mal de bonnes pratiques qui nous avaient poussés à utiliser des frameworks plus modernes

## 0. Comprendre où on met les pieds

Je suis donc arrivé dans cette équipe en tant que 5ème développeur. Je n'ai pas été recruté en tant que Lead ni Staff (mon rôle actuel), mais en tant que Senior. Bien qu'on m'ait recruté pour mes compétences et que je sois habitué au domaine du e-commerce, je ne connaissais pas le contexte du projet et ne connaissais pas vraiment le modèle start-up. De plus, SINGULART était dans une phase où il fallait continuer de livrer des nouvelles choses avec beaucoup de choses à tester et une levée de fond à préparer. Ce qu'il a été urgent de ne pas faire était de proposer un plan en 15 étapes pour arriver à une stack moderne.

Mes premières contributions rentraient donc dans le cadre qu'on avait déjà en place en me contentant de commencer à extraire des petits composants ici et là. Ces composants ont d'ailleurs fini eux aussi par être refactoré mais m'ont permis de comprendre comment appliquer la philosophie de composant à une stack en Twig/Less/jQuery (un prochain article de blog certainement).

En commençant petit, le but était de commencer à me familiariser avec l'équipe et comprendre où étaient les enjeux. Je suis un fervent croyant du fait qu'avec n'importe quelle stack on peut faire des choses de qualité. Il me fallait donc différencier ce qui méritait un peu de neuf de ce qu'on pouvait garder.

## 1. Etablir la confiance

L'étape suivante était de construire un socle de collaboration. Rien ne peut fonctionner si chaque personne de l'équipe oeuvre dans son sens. Et cela passe donc par commencer à s'aligner ensemble afin d'avoir confiance dans le jugement de chacun•e. Ce n'est pas une étape qui a été réléchie et planifiée comme telle. Cependant, avec le recul, je pense que c'est ce qui m'a permis de façonner une forme de confiance dans ce que je pouvais apporter à l'équipe et l'entreprise.

Notamment une des actions les plus efficaces a été de prendre 10 minutes toutes les semaines lors de la réunion de veille hebdomadaire pour présenter des sujets front. Là encore, mon but n'était pas de présenter le dernier framework à la mode &ndash; ça n'aurait pas passionné grand monde avec une équipe essentiellement constituée de full-stack orientés back. Je me suis contenté d'extraire les commentaires que je pouvais faire dans les PRs pour que ça bénéficie au plus grand nombre et surtout que ce soit faisable/adoptable dès le lendemain.

Le scope de ces présentations était très varié :

- petits sujets tel que la présentation des unités en CSS (px, em, rem, ch, etc.), l'utilisation de `inherit`, ou des [transitions](https://www.julienpradet.fr/tutoriels/des-animations-performantes-1/)
- rédaction et présentation de certaines pages de documentation (ex: les différentes méthodes de chargement des images déjà en place telles que lazyload, preload, redimensionnement, etc.)
- à des présentations de bonnes pratiques que je commence à vouloir pousser et qui ne représentent pas beaucoup de friction ([BEM](https://getbem.com/naming/), Atomic Design)

Parfois, elles étaient trop succinctes et ont fait émergé plus d'incompréhensions qu'autre chose (👀 `inherit`).

Mais quelle que soit votre situation et votre niveau dans l'entreprise c'est quelque chose qui vous sera bénéfique et qui sera apprécié de vos collègues : vous êtes obligé·e·s de vuglariser vos pensées, différencier ce qui est important de ce qui ne l'est pas et commencer à prêcher pour ce qui vous semble être la bonne direction. Cela établira aussi des conversations avec d'autres et généralement vous en apprendrez autant voire plus que les personnes en face de vous.

Ce qui m'a le plus aidé pour être à l'aise sur ce genre de présentations, ce sont :

- les **séances de pair** : comprendre comment l'autre fonctionne et apprendre à expliquer un concept en quelques mots
- ce **blog** : faire le tri entre le détail et l'important, visualiser le cheminement de la pensée pour ne pas perdre l'autre en cours de route
- les **pages de documentation** (notamment quand j'étais à [Front-Commerce](https://www.front-commerce.com/)) : réaliser que chaque information nécessite son propre format (un Guide ne s'écrit pas de la même façon qu'une doc d'API)
- les [**conférences en meetup**](/conferences/) : pour comprendre l'importance des slides et des démos pour capter l'attention des gens

C'est d'autant plus vrai qu'à mes premiers essais, tout cela me prenait un temps déraisonnablement long. Mais à force de pratique, je peux maintenant improviser la plupart des présentations techniques ou écrire certains articles ou pages de documentation d'une traite.

Ainsi, en faisant ces présentations à SINGULART, ça m'a donné une visibilité au sein de l'entreprise et m'a permis d'établir un échange avec tous les devs (au début on n'était pas beaucoup mais on est rapidement monté à une vingtaine de personnes réparties en 4 équipes). Quand il fallait commencer à se pencher sur des sujets front plus complexes, les gens ont commencé à venir vers moi parce qu'à leur yeux j'étais le _sachant_. En vrai c'est juste qu'on réfléchissait ensemble et je n'avais pas forcément la réponse à toutes les questions, mais c'est ce qui fait que j'ai pu emmagasiner un maximum de contexte.

## 2. Collaboration inter-équipe

Pendant les premiers mois nous êtions tous dans la même équipe. Mais dès que l'équipe a commencé à grossir, il y a eu une séparation en 2 puis 4 squads différentes (<abbr title="Also Known As">a.k.a.</abbr> équipes ou Product/Feature Team). Au maximum nous étions 6 développeurs purement front, et une petite dizaine de full-stack à travailler de temps à temps sur le front.

Dès qu'il y a eu 2 squads, nous avons commencé à avoir besoin de nous synchroniser entre fronts. C'était d'autant plus nécessaire qu'on commençait à extraire des composants qu'on allait réutiliser entre nous. Si personne n'était au courant du composant, c'était comme s'il n'existait pas. Alors il fallait qu'on se parle :

- des nouvelles choses qu'on mettait en place dans la codebase qui pouvait être utile aux autres
- des problématiques qu'on avait au quotidien avec peut être un composant/outil qui méritait d'émerger ou un manque de synchronisation sur certaines pratiques de code
- des éléments de veille tech

Nous n'avons pas eu besoin d'attendre une Guilde, un Chapter ou tout autre terme pour désigner une équipe transverse : nous nous sommes créés un channel Slack pour initier les discussions entre front. Pour vous donner un exemple, les premières discussions étaient autour du système de colonnage et la mise en place de classes atomiques pour la gestion des marges. Ca n'a pas besoin d'être révolutionnaire pour être utile.

Plus tard, nous avons décidé d'organiser un créneau hebdomadaire de 30min, ensuite étendu à 1h, pour faire le point et s'assurer qu'on était toujours sur la même longueur d'onde. Ce créneau aurait mérité d'exister dès le début, quitte à l'écourter si on n'avait rien à se dire.

D'un point de vue équipe c'était un temps qui permettait surtout de prendre la température et de traiter les frustrations avant qu'elles ne deviennent trop grandes. Ainsi même si on n'a jamais établi de Roadmap sur 12 mois, on avait toujours une idée du focus pour les 2 prochains mois, au début de manière implicite, puis de manière explicite avec une vraie Roadmap présentée aux autres équipes.

Ce qui a fait du bien pour faciliter cette collaboration c'est la mise en place de Guildes. Nous avions conscience que le travail produit avait tendance à cannibaliser beaucoup de travail tech, ce qui n'allait pas forcément dans la résolution de la dette technique. En officialisant les Guildes, nous avions désormais du temps dédié à l'amélioration de la stack, la mise en place d'outils ou l'extraction de composants.

Enfin, le plus gros avantage à mon sens était que cette collaboration transverse permette à chacun et chacune dans sa squad de devenir référent front. Ce n'est pas forcément évident selon les niveaux d'expérience des personnes, mais cela a permis a minima de mettre en place des relais. C'était notamment très important afin que chaque changement ne vienne pas de moi, mais de l'équipe au complet. Je n'ai ainsi jamais ressenti le besoin de forcer un changement aurpès des devs car l'équipe en avait entendu parler avant même qu'il arrive.

A noter cependant que les fronts ne sont pas les seuls responsables de l'interface du site. Beaucoup de ce travail et beaucoup des mêmes problématiques se retrouvent dans le travail des Designers. Nous avons donc aussi mis en place un temps de discussion pour parler spécifiquement Design System et comment améliorer notre collaboration avec elleux. C'est d'ailleurs quelque chose que nous aurions certainement dû faire plus tôt : il ne peut sortir que du positif d'une collaboration étroite entre Design et Tech sans nécessairement avoir tout le temps le Produit (déjà débordé) dans l'équation.

## 3. Mettre à disposition les outils avec un bon rapport coût/impact

Un autre élément qui a permis d'initaliser l'autonomie de l'équipe front était la mise en place d'outils qui nous aideraient au quotidien mais qui ne seraient pas très couteux à mettre en place.

1. `eslint` : repérer des erreurs le plus tôt possible
2. `webpack-dev-server` : accélérer les temps de compilation en local
3. `prettier` : ne plus jamais avoir besoin de faire des retours de code style dans les PRs
4. `jest` : des tests unitaires sur des fonctions simples
5. `storybook` : initialiser une documentation vivante des composants

J'insiste sur l'aspect pas très couteux. S'il faut 4 jours pour mettre en place un outil, c'est peut-être que vous pouvez viser plus petit. S'il est impossible de le caler entre deux tâches, cela veut dire que ça devient un réel chantier à prioriser au même titre que le reste. Il faut alors convaincre et défendre son outil. Toutefois, s'il s'agit d'une petite tâche, on peut rapidement avoir de la valeur et ainsi négocier plus de temps _a posteriori_ pour atteindre le plein potentiel de l'outil.

Par exemple, pour `jest` nous avons une stack en Twig, Less & jQuery. Pas idéal pour rédiger des tests unitaires front-end. Ce n'est pas grave, la première mise en place était uniquement sur du JavaScript pur. Plus tard, j'ai fait en sorte qu'on puisse réellement [tester les composants Twig](/tutoriels/testing-library-adapter-a-son-propre-framework/).

Sur `eslint`, inutile de passer des jours à corriger le code qui est en prod depuis des années. On peut marquer les fichiers _legacy_ en warning uniquement et forcer les erreurs uniquement sur les nouveaux fichiers.

Il y a encore d'autres outils qui nous seraient bénéfiques (TypeScript, Vite...), mais chaque chose en son temps, ils viendront petit à petit.

Pour vous donner une idée, si on compte uniquement la liste ci-dessus, ça n'a pas été du jour au lendemain. Il a fallu quasiment un an. Ca paraît très long. Mais rétrospectivement, je ne suis pas sûr qu'en allant plus vite ça nous aurait aidé.

## 4. Construire étape par étape

En effet, un des plus grands pièges pour moi est de vouloir mettre en place tout, tout de suite. Je savais le premier jour de mon arrivée à SINGULART que des tests unitaires nous seraient utiles, Storybook nous serait utile, etc.

Mais j'avais aussi conscience que chaque chantier méritait son propre calendrier. A vouloir tout faire passer d'un coup :

- on bloque les avancées produit plus longtemps &ndash; ce qui peut runier la confiance durement acquise
- la dernière brique ajoutée n'est pas maîtrisée par l'équipe avant de passer à la suivante et donc on en obtient que 20% de la valeur.
- on ne sait pas si on est allé dans la bonne direction : il vaut mieux stabiliser notre édifice avant d'ajouter un nouvel étage

Les autres personnes de l'équipe vous dirons que j'ai souvent ce rôle de rabat-joie : ok on veut aller vers ça, mais c'est quoi les étapes ? Est-ce qu'on a vraiment besoin de tout ça ? On pourrait pas faire plus simple pour commencer ? Dans l'extrême majorité des cas je suis très content de l'apparente lenteur qu'on a mis en place. Ca nous a permis de continuer d'avancer sur le produit et notre socle est d'autant plus stable. Deux ans plus tard, on a conscience qu'on vient de loin.

Par ailleurs, cela a permis d'osciller entre petits ajouts et grosses fonctionnalités. En effet, je vous ai présenté plus haut uniquement les outils techniques, mais il y a aussi tout le penchant architecture :

- comment organiser nos composants ?
- comment améliorer la communication back/front (= Symfony/Twig) ?
- comment gérer l'asynchrone/ajax ?

Généralement pour répondre à ces questions, c'était un plus gros projet. Il fallait par exemple lister les problèmes qui nous barraient la route, expliquer comment on voulait les résoudre et aller chercher le feedback des autres développeurs. Mais en ayant des premières victoires avec les petits projets, il était plus facile d'avoir la confiance du leadership quand il s'agissait d'amener un plus gros changement. Généralement il s'agissait plus de former la réflexion et partager nos plans qu'une réelle remise en question de la pertinence du projet.

Ca n'a pas empêché que l'adoption d'un projet ne soit pas au rendez-vous ou que nous ayons besoin d'itérer sur certaines solutions. Mais ça nous a permis d'y aller petit à petit, d'échouer/réussir que sur des petites parties.

## 5. Tout ne doit pas être une réussite

Parce que oui, il y a eu des échecs. Et c'est peut-être la partie la plus importante : tout n'a pas besoin d'être une flamboyante réussite, ou correspondre parfaitement à la première idée que vous vous êtiez faites.

Aujourd'hui encore, quand je travaille sur SINGULART, j'ai conscience qu'il y a encore beaucoup de choses à améliorer, mais on y arrive petit à petit. On continue notre bonhomme de chemin.

En y allant de manière incrémentale, cela permet de démarrer certains projet sous forme d'expérimentations. Chaque PR ne doit pas être une décision finale de comment nous ferons les choses. Profitez des petits projets pour expérimenter certaines approches, dégrossir certaines techniques. L'essentiel est que ça n'impacte pas lourdement le reste de la code base et que ce soit facile à changer. Et cela vous permettra d'avoir des éléments concrets à présenter le jour où vous voudrez généraliser.

Par ailleurs, cela permet aussi de récupérer uniquement ce dont vous avez besoin. Notre manière de développer aujourd'hui ressemble de plus en plus à ce que propose [Hotwire](https://hotwired.dev/) (plus connu sous le nom de Stimulus/Turbo). Cependant, l'adoption de Hotwire représentait une marche trop haute pour nous à un instant T. Elle l'était parce que je n'avais personnellement pas le temps nécessaire à accorder à son évangélisation et parce qu'il était plus simple de proposer un petit bout de code custom plutôt que l'adoption d'un framework.

Je n'ai pas encore le recul nécessaire aujourd'hui pour conclure et dire si c'était une bonne ou une mauvaise chose. Je sais en tout cas que c'est le choix qui fait que je suis moins _fier_ de notre stack aujourd'hui. Mais est-ce que pour autant c'est un choix qui impacte négativement nos collectionneurs et nos artistes ? Je n'en suis pas sûr.

En tout cas, cela veut simplement dire qu'on a le droit de se tromper, de ne pas aller vers la vision initiale et de changer de route. L'essentiel étant de continuer à avancer.

## 6. Célébrer les victoires

Mais qu'est ce que ça veut dire avancer ?

D'expérience, le paroxisme d'un projet est à sa livraison : on a passé quelques jours, voire quelques semaines, à faire avancer une vision, un outil, une solution et vient enfin la date fatidique de la mise en prod. Tout le monde est content, on vient de faire la présentation et roule ma poule, on considère que ce sera adopté dans les prochaines PRs.

Le problème c'est qu'à cet instant on ne sait pas vraiment si ce qu'on a fait est utile ou pas. On aura beau anticiper en étudiant en détails les problèmes auxquels on fait face, si seule lae dev de la fonctionnalité sait comment ça marche, on ne les aura pas résolu.

Alors pour chaque changement il est impératif de prendre le temps, quelques semaines plus tard, d'estimer l'impact du changement. Ca passe parfois par des mesures : on a augmenté la couverture de tests de 10%, et la pipeline nous a évité 13 bugs ce dernier mois. Mais la plupart du temps ce sera du ressenti avec des retours terrain : Est-ce que la nouvelle feature est utilisée ? Est-ce qu'en allant voir les devs qui l'ont utilisé iels ont eu des soucis ? Se sentent-iels plus efficaces ?

Le fait de comprendre l'impact vous permettra de savoir déjà si oui ou non le sujet est traité. Mais c'est aussi l'occasion pour vous de communiquer :

- rappeler à tout le monde que cette fonctionnalité mise en place il y a 3 mois a aidé 2 projets et donc sera peut être utile pour une autre équipe
- mettre en valeur l'impact positif afin de montrer valoriser les personnes qui ont travaillé dessus et valider la pertinence de nos changements
- consolider la confiance en montrant qu'on ne travaille pas sur ces outils uniquement parce que c'est rigolo ou pour résoudre la sacro sainte dette technique, mais bien pour avoir impact sur le produit
- et ne pas oublier de parler de ce qui n'a pas marché pour comprendre pourquoi, ne pas répéter les mêmes erreurs et faire bénéficier aux autres équipes de notre apprentissage

## Conclusion

Bref, mener au changement n'est pas de tout repos et dépend de la coordination de plein de facteurs techniques mais surtout humains. Ce que ça veut dire aussi c'est que ce que j'ai vécu au sein de SINGULART peut fonctionner pour vous, ou peut-être pas. 😁 C'est d'autant plus vrai que tout n'est pas forcément entre vos mains, certaines entreprises laisseront plus d'opportunités que d'autres.

Cependant, je retrouve pas mal des éléments que j'ai pu énoncer dans cet [article de Charity Majors](https://charity.wtf/2023/06/05/drive-change-and-influence-teams-without-power/), notamment la partie "quand je suis tech lead dans une nouvelle équipe".

En tout cas, si je pouvais résumer ma stratégie en quelques phrases :

- commencer en adoptant le cadre actuel afin de comprendre les tenants et aboutissants
- privilégier dans un premier temps de simples discussions pour générer de la confiance
- établir la communication avec les personnes qui seront directement impactées
- commencer avec des quick wins pour initier le mouvement
- y aller petit à petit pour ne pas se noyer
- accepter les échecs pour rester dans la bonne direction
- célébrer les victoires pour pouvoir continuer

Est-ce que j'aurais pu vous dire le jour de mon embauche que j'allais exécuter cette stratégie ? Absoluement pas. Mais rétrospectivement c'est ce qui s'est dessiné et ce qui semble nous avoir mené où nous en sommes aujourd'hui.

Est-ce que vous auriez fait différemment ? Êtes vous plutôt du genre à prévoir une adoption incrémentale planifiée dès le départ ? Ca m'intéresse de savoir comment vous approcheriez la situation. N'hésitez pas à venir m'en parler sur [Mastodon](https://piaille.fr/@julienpradet), [Twitter](https://twitter.com/JulienPradet) ou en ouvrant une issue sur [GithHub](https://github.com/JulienPradet/blog-posts).
