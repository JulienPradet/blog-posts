## Les *layers*

Pour comprendre pourquoi on utilise `will-change`, il faut comprendre la notion de *layer* (ou *calque*).

Comment d'après vous sont dessinées les choses à l'écran&nbsp;? Généralement, la première solution qui vient à l'esprit est de dessiner les pixels un par un.

Ainsi, pour dessiner un bouton, on commence par dessiner le fond de celui-ci. On dit donc à l'ordinateur de colorier, un par un, les pixels qui composent le fond. Puis, on ajoute le texte en précisant à l'ordinateur quels pixels doivent changer de couleur.

C'est ce que fait le navigateur au moment du *Painting*. Il définit la couleur que doit avoir chaque pixel pour pouvoir les afficher à l'écran.

Si on reste sur cette approche, à chaque fois que quelque chose change, il faut redessiner l'ensemble de l'écran. Pourtant, si le bouton doit uniquement se décaler de quelques pixels sur la droite, c'est dommage de devoir recalculer l'ensemble des pixels du bouton.

C'est ici qu'intervient les *layers*. L'idée est de dire que l'on connaît déjà la position des pixels, et qu'il suffit de les déplacer par blocs. C'est exactement la même chose que ce que vous feriez avec du papier calque. En dessinant sur plusieurs feuilles et en les superposant, vous n'avez pas besoin de tout redessiner à chaque fois que vous voulez changer un élément (ex&nbsp;: [les celluloïds](http://www.dvdanime.net/articleview.php?id=45)).

Ce qu'il y a de top dans tout ça, c'est que dans l'ensemble le navigateur s'en charge automatiquement pour vous. Mais quand il n'arrive pas à déterminer les bons calques, comment l'aider ?

## Identifier ce qui est redessiné dans la page

Tout d'abord, avant de savoir comment l'aider, il faut savoir où l'aider. Pour cela, il va falloir identifier quelles sont les parties de votre page qui sont repeintes inutilement.

On demande donc au navigateur d'afficher ce qu'il repeint. C'est une option assez cachée sur les différents navigateurs. Cependant, elle permet de voir visuellement quelles sont les parties de la page qui posent problème.

Sur Chrome, il faut ouvrir les dev tools, et tout en bas, il y a un onglet *Console*. Il faut cliquer sur le bouton à gauche de celle-ci et activer l'onglet *Rendering*. Dans celui-ci il faut alors cocher l'option *Paint Flashing*.

Sur Firefox, dans les dev tools, en haut à droite, il faut ouvrir les *Toolbox Options*. Et dans la section *Available Toolbox Buttons*, il faut activer *Highlight painted area*. Le bouton apparaît alors dans la liste des boutons en haut à droite des dev tools et il ne reste plus qu'à l'activer.

Une fois l'option activée, vous pouvez scroller sur la page surlaquelle vous êtes et vous verrez des zones vertes apparaître (notamment la scrollbar).

Si lors de vos animations, quelque chose est repeint constamment, c'est mauvais signe.

Voici un exemple qui lag (j'y ai mis tout mon talent)&nbsp;:
