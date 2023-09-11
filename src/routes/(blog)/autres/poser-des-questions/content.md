Qui ne s'est jamais retrouvé·e dans la panade parce qu'il paraissait impossible d'obtenir réponse à ses questions ? Vous avez l'impression d'avoir posé votre question il y a plusieurs jours, voire plusieurs semaines et vous n'en finissez plus de faire des relances. Ca vous échappe et la frustration s'accumule.

C'est quelque chose qui m'est arrivé très souvent par le passé mais qui a tendance à se raréfier dans mon quotidien. Il y a évidemment plein de raisons à ça, dont certainement des points que je n'ai pas identifié. Mais dans cet article de blog, je vais essayer de vous parler de ce que je peux faire à mon échelle pour améliorer la rapidité et la qualité des réponses que je reçois.

Je travaille en tant que développeur et suis aujourd'hui responsable de toute la partie front-end dans la startup où je suis (en plus de mon [activité freelance](/developpeur-web-performance/)). Cela me permet notamment de me placer de deux points de vues différents :

- si je dois obtenir une réponse d'une autre personne sachante
- si on vient me poser une question parce que je suis le sachant (ou parce que je suis censé l'être :p)

> 💡 Ma réflexion sera donc nécessairement biaisée par ce prisme et sûrement que votre contexte rendra certaines choses inapplicables. De plus, j'ai conscience d'être bouffi de privilèges, ce qui me permet d'aborder la plupart des problématiques beaucoup plus facilement. Mais j'essayerai de nuancer suffisamment mes propos pour que vous puissiez en tirer quelque chose, même dans votre contexte et votre métier.

Avant de parler de comment poser une question, je vais faire un pas de côté et me demander de quelles informations j'ai besoin pour répondre aux questions que l'on me pose. C'est en comprenant mieux ce besoin que je pourrai mieux anticiper le besoin des autres et ainsi améliorer ma manière de poser des questions.

## Le contexte

Première information incontournable : le contexte. Une question ne sort jamais de nul part. J'ai besoin de savoir pourquoi est-ce que cette question a émergé pour pouvoir bien y répondre.

Prenons l'exemple suivant, résolument technique :

> **Comment faire pour changer la couleur de fond en CSS ?**

Je sais répondre techniquement à cette question : il faut ajouter une classe en CSS pour lui ajouter un `background-color: <color>`. Si je réponds ceci, il y a de fortes chances qu'effectivement la personne qui m'a posé la question soit débloquée et ajoute une nouvelle classe pour modifier la couleur.

Cependant, la couleur que la personne voulait changer était le fond d'un bouton : en effet, celui-ci est noir par défaut, mais cette fois-ci on a besoin d'un fond blanc. A ce moment ce n'est plus une classe, mais une variante qu'il faut ajouter à notre composant `Button`. Ca pourrait donc être une distinction entre `primary` et `secondary`.

Mais finalement, en creusant un peu plus, on se rend compte que c'est parce qu'on veut afficher un bouton important par dessus une image qui, elle, est foncée. Dans les faits, c'est donc toujours un Primary (= une action importante/primaire), mais qui devrait être affiché différemment parce qu'on est dans un contexte foncé. La solution n'est donc pas d'ajouter une variante, mais une gestion de contexte.

Sur un problème aussi basique, on constate qu'on a déjà trois réponses différentes en fonction du contexte qui a été donné. Pour aboutir à la bonne réponse, il a fallu savoir la raison exacte pour laquelle on a été confronté à la problématique. Donc quand je pose ma question, je m'efforce toujours de contextualiser celle-ci :

> **Je suis en train de travailler sur le projet de la nouvelle bannière en page d'accueil. Au niveau des maquettes il y a un bouton qu'on n'a pas dans nos composants.** Comment faire pour changer la couleur de fond en CSS ?

Ceci va être vrai pour n'importe quel domaine. Si vous voulez poser une question à votre designer ou designeuse, vous aurez besoin de lui dire que vous avez un souci dans telle configuration d'écran ou pour un texte de telle taille. S'il s'agit de votre expert·e métier, vous aurez besoin de lui dire d'où vient ce nouveau problème que vous avez identifié. Sans cela, la personne ne pourra vous répondre que de manière approximative ou ne comprendra pas réellement votre problématique.

## Prioriser la question

Une autre information qui m'est utile lorsque je reçois une question est son niveau d'importance. En effet, je suis généralement en train de travailler sur autre chose quand la question tombe. Parfois, je n'ai pas été disponible pendant une longue période et donc j'ai plusieurs personnes qui sont venues me voir pour me poser des questions.

Je n'ai pas le choix, il faut donc que je priorise. En effet, même si je vais lire chacune des questions, en fonction de mon temps disponible, je ne vais pas forcément pouvoir répondre à tout le monde. Je vais donc avoir besoin d'être capable de rapidement scanner la priorité de chacune. Pour cela, je vais me demander :

- Est-ce que la personne est complètement bloquée en attendant ma réponse ?
- Est-ce que ma réponse peut être structurante pour la suite ? Est-ce que cela peut faire complètement changer de direction ?
- Est-ce que je peux apporter rapidement une réponse ou est-ce que j'ai besoin de creuser le sujet et prendre le temps ?

Par exemple, si cela bloque complètement une personne ou une équipe, je vais certainement devoir tout lâcher pour apporter une réponse. Mais si ce n'est pas évident dans la manière dont est posée la question, je risque de mal percevoir le niveau d'urgence et de retarder quelque chose qui ne devrait pas l'être.

Plus concrètement, si on me demande :

> **Est-ce qu'on peut ajouter un CMS (Content Management System) à notre site ?**

La réponse est forcément oui. Mais ce n'est pas le même effort de permettre à une personne d'ajouter du gras ou un lien au milieu d'un texte vs avoir la possibilité d'administrer du contenu qui respecte notre charte graphique, avec des modules complexes à base d'images, de données structurées, etc.

Vu que ça ressemble à une question vaste pour une stratégie long terme, je vais donc sûrement répondre que je reviens vers la personne dans une semaine ou deux avec plus d'éléments. Si au contraire il y a besoin d'améliorer la gestion de contenu pour la fin de la semaine, il faut que je m'y penche rapidement.

De fait, une meilleure manière de poser la question serait :

> **On est en train de préparer le prochain sprint qui démarre semaine prochaine. On voudrait ajouter un module sur la page qui permet d'afficher du contenu mis en forme par un ou une administratrice.** Est-ce qu'on pourrait ajouter un CMS à notre site ?

Ainsi, je me rends compte plus facilement de l'ampleur du chantier et je vais certainement proposer d'organiser un point à l'oral dans la journée. Si vous êtes en mesure d'anticiper qu'il faudra une réunion, vous pouvez même changer la formulation pour demander quel est le créneau qui m'arrange le mieux pour qu'on en discute.

Lorsque c'est à mon tour de poser une question, j'ai conscience que la personne en face devra se poser le même genre de questions, faire le même genre d'arbitrages. Parfois une question qui paraît simple de mon point de vue, ne rentre pas dans les priorités de la personne sachante. Indiquer toutes les informations nécessaires pour que la tâche soit priorisée au mieux l'aidera donc à mieux comprendre mes enjeux.

Attention toutefois à ne pas rendre tout urgent et gravement important si ça ne l'est pas. C'est le meilleur moyen de perdre l'attention de la personne sur la durée. Je pense que toute personne ayant dû gérer des tickets venant de l'extérieur a vécu cela au moins une fois dans sa vie :)

## Obtenir une réponse immédiate

Cela dit, tout n'a pas besoin d'être priorisé sur un temps long. Il est parfois possible de tourner la question pour faire gagner un maximum de temps à la personne qui fournira la réponse. Typiquement, en terme de priorisation, si on me pose une question qui ne me demandera pas plus de 5min de mon temps, je ferai en sorte d'y répondre dès que j'en prends connaissance. Ca débloque la personne et ça me libère du temps de cerveau.

Mais rares sont les questions qui prennent réellement 5min. Celles qui ont le plus de chance d'aboutir à cela sont celles où on me demande de valider un choix.

Reprenons l'exemple du CSS :

> **Comment faire pour changer la couleur de fond en CSS ?**

On y avait déjà ajouté le contexte :

> **Je suis en train de travailler sur le projet de la nouvelle bannière en page d'accueil. Au niveau des maquettes il y a un bouton qu'on n'a pas dans nos composants.** Comment faire pour changer la couleur de fond en CSS ?

On pourrait y ajouter la solution à laquelle on a pensé :

> Je suis en train de travailler sur le projet de la nouvelle bannière en page d'accueil. Au niveau des maquettes il y a un bouton qu'on n'a pas dans nos composants. Comment faire pour changer la couleur de fond en CSS ?
> **La solution que j'avais en tête était d'ajouter une nouvelle variante au composant Button parce que c'est comme ça qu'on avait ajouté les boutons `danger` mais je ne suis pas sûr de moi. Est-ce que ça te paraît être une bonne idée ?**

Potentiellement, la réponse peut simplement être "Yep, parfait 🙌". Et même si ce n'est pas le cas (vu qu'ici on préfère utiliser le contexte plutôt qu'une variante), ça me permet de mieux calibrer ma réponse : je sais ce que la personne a déjà exploré et je vais pouvoir alléger ma réponse **et** adapter son contenu à ce que la personne avait déjà en tête. Il y a plus de chances que ça rentre dans mes 5min disponibles.

Vous pouvez d'ailleurs remarquer que j'ai glissé dans la question une explication de _pourquoi_ on a envisagé cette solution. Cela permet à nouveau de prémacher le travail car en réfléchissant à une solution, je réfléchis moi-même aux différents éléments qui m'amènent à cette conclusion. S'il manque un élément, je suis en mesure de plus facilement le pointer du doigt pour qu'il soit pris en considération dans la solution finale.

Par ailleurs, c'est aussi comme ça qu'on crée de l'alignement et que les questions se raréfient : le plus gros du travail a été fait par la personne qui a posé la question. Avec l'expérience sur le projet, elle deviendra donc de plus en plus autonome et constatera que son intuition est souvent la bonne.

Si vous êtes junior, c'est donc une excellente technique à mettre en place. C'est ce qui vous permettra de gagner au fur et à mesure la confiance de vos collègues.

Attention cependant, cela peut aussi créer un biais. En effet, en proposant une ou des solutions, si le sujet est complexe, on risque d'orienter la réponse vers notre proposition plutôt que vers la bonne réponse. C'est par exemple pour ça que dans le contexte d'interview utilisateurice, il y a toute une méthodologie et une manière d'aborder les discussions pour éviter au maximum ces biais. Mais pour la majorité des questions du quotidien, proposer des solutions et expliquer pourquoi, accélérera réellement les discussions.

L'étape ultime de cette méthode est de transformer une question en un "Pour info". Il faut prendre soin d'en discuter en amont avec les personnes avec qui vous travaillez pour s'assurer que ce soit bien perçu. Mais si vous êtes quasiment sûr de la solution que vous souhaitez choisir, que toutefois cela peut impacter d'autres personnes ou que vous avez conscience que cela peut être sujet à débat, alors il est important de partager l'information.

> **Pour info, je vais ajouter une nouvelle variante sur le Button parce que j'en ai besoin pour afficher le bouton en blanc par dessus une image.**

Si ce n'est pas la bonne solution et que c'est un sujet suffisamment important pour mériter un changement de direction, je peux vous assurer qu'une personne viendra répondre à votre message en [sonnant l'alarme](https://xkcd.com/386/).

## Une question est l'origine d'une réflexion à plusieurs

Enfin, quand on vient me poser une question, il faut bien avoir en tête que je n'ai pas la science infuse. Généralement, je vais faire au mieux pour partager mon expérience, expliquer pourquoi je choisirais telle ou telle solution. Avec le temps, il commence à y avoir de plus en plus de sujets sur lesquels je peux avoir raison.

Mais je peux me tromper. Comme n'importe qui qui reçoit une question.

C'est pour cette raison que lorsque vous vous tournez vers une personne pour obtenir une réponse, vous pouvez tout à fait apporter votre point de vue, et tout élément qui vous permettra ensemble de construire une opinion. C'est d'autant plus vrai dans le domaine du web où il n'y a pas vraiment de bonne réponse : on ne fait que des choix dans un contexte donné. On essaye de faire les bons, d'équilibrer nos budgets et d'avancer vers quelque chose qui sera utile à nos utilisateurices. Mais rien n'est définitif et on peut toujours corriger a posteriori (évidemment, à nuancer en fonction de votre domaine et de l'impact que vos choix peuvent avoir sur de vraies personnes).

Ceci est encore accentué par le fait que certaines des questions se trouveront à l'intersection de plusieurs expertises :

> **Quand une personne soumet ce formulaire, tu préfères recevoir un mail ou qu'on crée un Contact dans le <abbr title="Customer Relationship Management">CRM</abbr> ?**

Dans un monde idéal, le CRM est certainement la solution la plus pérenne parce que cela permet ensuite d'automatiser facilement tout un tas de tâches et d'éviter le [Bus Factor](https://fr.wikipedia.org/wiki/Facteur_d%27autobus). Mais en réalité, la question est plutôt :

> **Est-ce que tu préfères recevoir un mail et qu'on ait le temps de finir cette autre fonctionnalité ? Ou qu'on le mette dans le CRM et dans ce cas on va devoir faire sauter/repousser l'autre fonctionnalité ?**

Il est important de mettre en avant le dilemme auquel on fait face pour que les différentes parties aient toutes les cartes en main pour prendre la bonne décision. Si vous ne le faites pas, vous risquez de mettre de l'énergie au mauvais endroit et cela va uniquement créer de la frustration.

## Poser la question à la bonne personne

Enfin, une composante essentielle pour obtenir votre réponse est de poser la question à la bonne personne.

**Est-ce que cette personne fait partie de votre équipe ?**

Si oui, utilisez au maximum une méthode de communication publique. Si vous utilisez Slack, ce sera le channel où se trouve toutes les personnes de votre équipe. En effet, si la question vous est venu, il y a de fortes chances que cela intéresse d'autres personnes de votre équipe. En discutant dans un lieu ouvert, vous simplifiez le partage d'information. Mieux : si quelqu'un·e a déjà posé la question, elle sera aussi en mesure de vous répondre si elle est disponible avant la personne que vous aviez en tête.

Toutefois, attention à ne pas poser une question dans le vague : en n'adressant personne, vous pensez peut-être que tout le monde peut y répondre. Mais si tout le monde est occupé, il y a plus de chances que personne n'y réponde. Essayez donc de cibler la personne qui sera la plus à même d'y répondre, tout en laissant la porte ouverte pour que d'autres personnes se sentent autorisées à répondre.

> Dites, vous feriez comment pour ajouter un fond en CSS sur \<lien vers la maquette\> ? **(cc @Julien)**

**Mais vous n'êtes pas à l'aise à l'idée de poser la question en publique.** Parfois, surtout au démarrage dans une nouvelle équipe, vous aurez sûrement l'impression de poser trop de questions. De déranger. Si c'est le cas, demandez :

> En ce moment j'ai beaucoup de questions : je ne veux pas vous spammer, est-ce qu'il y a une méthode que vous préfériez que j'utilise ?

Dans ma vie professionnelle, j'ai vu 2 solutions :

- l'extrême majorité du temps, on m'a répondu qu'il ne fallait pas s'inquiéter et qu'on contraire c'était l'occasion de commencer à bosser avec un peu tout le monde
- ou alors, on a mis en place un système de buddy : une personne dédiée qui pourra vous accompagner dans vos problématiques ou au pire vous rediriger vers la bonne personne si besoin

Choisissez celle la solution qui vous convient le mieux.

Si vous êtes lead d'une équipe, n'oubliez pas que l'effort que ça demande à la personne qui pose la question peut être bien plus élevé que ce que vous imaginez. Si vous constatez que les questions mettent du temps à arriver, c'est à vous de trouver une meilleur organisation ou à accompagner la personne pour qu'elle puisse prendre ses aises.

**Si, au contraire, la personne sachante ne fait pas partie de votre équipe : cela peut être un autre frein.**

Est-ce qu'elle mériterait de faire partie de votre équipe, même de manière temporaire ? Ouvrir un canal de discussion avec la personne sera certainement le moyen le plus efficace d'accélérer le temps de réponse. Mais ce n'est pas toujours faisable. Il peut alors être pertinent de trouver ensemble la méthode la plus efficace pour faire avancer les sujets : Une synchro hebdomadaire ? Un récap des questions par mails ? Des tickets où la personne est explicitement mentionnée ? (Spoiler alert : les mentions dans les tickets ça marche rarement) Toujours est-il qu'il est important de s'aligner sur ce sujet afin d'adopter la stratégie la plus efficace.

Parfois, ce ne sera pas suffisant. Parce qu'il y a une structure hiérarchique qui rend les choses compliquées. Parce qu'il y a une barrière de la langue. Parce que cette personne ne s'est pas montrée clémente la dernière fois que vous avez posé une question. Cela mériterait un ou plusieurs articles de blog pour aborder ce sujet. Mais une première piste serait de vous entourer de personnes qui seront en mesure de vous accompagner à résoudre cela. Attention cependant, évitez dans la mesure du possible de vous faire remplacer : sur le long terme ça ralentirai votre accès à l'information, vous rendra moins autonome et vous déresponsabilisera. Cherchez plutôt à vous faire accompagner afin que sur le temps long vous n'en ayez plus besoin.

## Récapitulatif

Si vous êtes arrivé·e jusqu'ici, avec un peu de chance, la prochaine question que vous poserez sera radicalement différente et plus complète que ce que vous aviez l'habitude de faire jusqu'à maintenant.

Pour être sûr de ne rien oublier, récapitulons les différents points qui, selon moi, vous permettront d'arriver à vos fins :

- apportez suffisamment de contexte afin d'obtenir la bonne réponse plutôt que _une_ réponse
- indiquez les informations nécessaire à la priorisation (ex : délai, impact, effort)
- prémâchez le travail en apportant des propositions en plus de votre question
- si la décision peut avoir des conséquences, mettez les en évidence afin que les tenants et aboutissants soient clairs
- identifiez toujours un ou une responsable, sinon, votre question passera à la trappe
- mettre en place le bon canal de discussion, idéalement publique, plutôt que le canal que vous préférez

Cela peut sembler être beaucoup de travail pour poser une simple question. Mais préférez-vous passer 30secondes à écrire une question qui ne sera jamais adressée ou 10min et obtenir à coup sûr une réponse ?

J'exagère évidemment en disant "à coup sûr". Il restera toujours des situations où vous aurez besoin de relancer, où il faudra déclencher un meeting pour être sûr que la personne bloque suffisamment de temps sur votre sujet. Mais à mon échelle, j'ai l'impression que cette méthode a largement améliorer mon taux de réponse. Alors pourquoi pas vous ?
