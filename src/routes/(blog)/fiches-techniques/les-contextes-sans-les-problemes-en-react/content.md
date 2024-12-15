> **Mise à jour :** Cet article existait à une époque où React ne fournissait pas de bons outils. Aujourd'hui avec [`useContext`](https://react.dev/reference/react/useContext) et une bonne memoization, vous ne devriez pas avoir besoin de tout ça.

L'idée derrière React est de construire un arbre de composants. Le père indique au fils comment s'afficher en lui passant des propriétés. Le fils passe à son tour des propriétés à ses propres fils, etc. Pourtant, aujourd'hui je ne vais pas vous parler des propriétés, mais je vais plutôt vous parler de comment éviter de passer des propriétés.

En effet, quand les gens commencent sur cette techno, la première déception est la verbosité que cela impose&nbsp;: il faut passer les propriétés une par une. D'autant plus qu'il fortement conseillé de réduire la taille de ses composants. Le nombre de passations à faire explose rapidement.

```jsx
function Enfant(props) {
	return (
		<div>
			<p>{props.name}</p>
			<ul>
				<li>
					<button onClick={props.action1}>Action 1</button>
				</li>
				<li>
					<button onClick={props.action2}>Action 2</button>
				</li>
				<li>
					<button onClick={props.action3}>Action 3</button>
				</li>
			</ul>
		</div>
	);
}

function Parent(props) {
	return (
		<Enfant
			name={props.name}
			action1={props.action1}
			action2={props.action2}
			action3={props.action3}
		/>
	);
}
```

Certes, le fait que chaque propriété soit passée explicitement est un des principaux avantages des applications React&nbsp;: on sait _quoi_ est utilisé _où_. Mais s'il y en a trop, on est vite perdu allant à l'encontre du but premier.

De plus, certaines propriétés n'ont pas besoin d'être connues par la plupart des composants. Par exemple, si votre application a deux thèmes différents, (`dark` ou `light`), vous allez avoir besoin de savoir quel thème est choisi dans chaque composant de vue pour pouvoir adapter son affichage. Si vous faites ça avec des propriétés, ca veut dire que vous allez devoir vous les trainer dans chacun des composants de votre application.

Quelles solutions s'offrent à nous ?

## Redux&nbsp;?

Redux est vraisemblablement la première solution crédible que vous trouverez via une recherche Google.

Redux gère l'état de votre application en partant du principe que l'état courant n'est qu'une fonction de l'état précédent et de l'action qui vient d'être émise.

C'est un très bon outil qui fonctionnera à merveille sur de grosses applications en plus de vous apporter plein de bonnes choses pour débugger le tout. Les concepts y sont très intéressants et peuvent vous amener doucettement vers la programmation fonctionnelle. Diversifier son champ de compétences, c'est toujours cool.

Par contre, si vous avez juste 3 chaînes de caractères à faire passer, pas beaucoup de temps à disposition et peu de connaissances fonctionnelles, c'est peut-être un peu overkill.

La deuxième solution qui remontera sera sûrement MobX, qui gagne en popularité. Mais la conclusion est la même.

Dans cet article, je vais plutôt vous proposer une solution basée sur les contextes, qui sont une fonctionnalité native de React.

## Qu'est ce qu'un contexte&nbsp;?

Pour faire court un [contexte](https://facebook.github.io/react/docs/context.html) est une propriété invisible, passée à toute la descendance d'un composant (enfants directs, petits enfants, etc.).

Il y a un petit problème cela dit. Les gens de chez Facebook qui maintiennent React, répètent sans arrêt qu'il ne faut pas les utiliser. La documentation officielle est d'ailleurs assez explicite à ce sujet&nbsp;: _If you want your application to be stable, don't use context. It is an experimental API and it is likely to break in future releases of React._.

Du coup, toute personne censée aura tendance à l'éviter. Alors pourquoi vous faire un article sur le sujet&nbsp;? [Surtout](http://putaindecode.io/fr/articles/js/react/higher-order-component/) [qu'il](https://www.tildedave.com/2014/11/15/introduction-to-contexts-in-react-js.html) [en](http://reactkungfu.com/2016/01/react-context-feature-in-practice/) [existe](https://medium.com/react-ecosystem/how-to-handle-react-context-a7592dfdcbc#.nil6zq5ks) [déjà](https://jaysoo.ca/2015/06/09/react-contexts-and-dependency-injection/) [beaucoup](https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076#.8lpixoqte).

Parce que les contextes répondent à un véritable besoin. D'ailleurs, la majorité des librairies qui ont besoin de communiquer sur plusieurs niveaux de composants l'utilisent. Je pense donc qu'il est important de connaître les bonnes règles à suivre pour pouvoir les utiliser car il y a de fortes chances que vous aussi un jour vous en ayez besoin.

## Comment l'utiliser&nbsp;?

La méthode que je vais présenter ici est légèrement plus évoluée que ce qui est expliqué dans la [documentation](https://facebook.github.io/react/docs/context.html). Si vous voulez savoir purement comment ça fonctionne, la documentation le fera mieux que moi. Je vais plutôt essayer de relayer ici des bonnes pratiques, que j'ai pioché à droite à gauche et que je me suis construit avec le temps sur l'utilisation des contextes.

1. **Définir un Provider** qui va irriguer le sous-arbre de son contexte

   Le fait de l'appeler `Provider` n'est qu'une convention. Essentiellement, c'est le parent à partir du quel tous les enfants auront accès au context. Son but n'est pas de gérer le contexte, mais uniquement de le faire passer, d'où le nom.

   ```jsx
   // Pour chaque point commenté, un paragraphe
   // est disponible juste en dessous du code.
   // N'hésitez pas à vous y référer.

   class ThemeProvider extends React.Component {
   	// 1.1. Définition des données du contexte
   	getChildContext() {
   		return {
   			theme: this.props.theme
   		};
   	}

   	// 1.2. Rendu de l'application
   	render() {
   		return React.Children.only(this.props.children);
   	}
   }

   // 1.3. Définition du type du contexte
   var themeType = {
   	theme: React.PropTypes.shape({
   		color: React.PropTypes.string.isRequired
   	}).isRequired
   };

   ThemeProvider.propTypes = themeType;

   ThemeProvider.childContextTypes = themeType;
   ```

   1.1. **Définition des données du contexte via getChildContext**  
   La fonction doit retourner les données accessibles aux enfants.  
   Le mieux est de récupérer les données depuis les propriétés, plutôt que de les initialiser directement dans le composant. D'une part, cela améliore la lisibilté de votre application, étant donné que vous n'avez pas besoin de lire le code du `Provider` pour savoir quel objet est dans votre contexte. D'autre part, vos composants sont plus testables, puisque vous pouvez changer les propriétés en entrée plutôt que d'aller hacker le `Provider`.

   1.2. **Rendu de l'application**  
   Il ne faut pas oublier que le Provider est un composant React comme un autre. Il faut donc que lui aussi fasse un rendu. Pour éviter de surcharger le DOM avec des divs inutiles, on utilise `React.Children.only` qui affiche directement l'enfant passé au `Provider`.

   1.3. **Définition du type du contexte**  
   Ce type est ce qui nous permettra de dire, dans les composants enfants, que c'est ce contexte en particulier qui nous intéresse. Il faut par contre éviter de faire en sorte que le contexte ait plusieurs clés. Ici, `ThemeProvider` n'en a qu'une : `theme`. En effet, si vous adoptez les contextes et commencez à avoir plusieurs `Providers`, vous risquez rapidement d'avoir des conflits de nommage. En réduisant le nombre clés exposées, vous réduisez le risque. D'ailleurs, [@acdlite semble dire que ça sera la seule façon de faire plus tard](https://twitter.com/acdlite/status/818543813815771137).

   Vous pouvez maintenant utiliser le `Provider` comme suit&nbsp;:

   ```jsx
   var theme = { color: '#ff0000' };

   ReactDOM.render(
   	<ThemeProvider theme={theme}>
   		<App />
   	</ThemeProvider>,
   	document.getElementById('root')
   );
   ```

   Ici, je l'ai fait à la racine de l'application. Mais rien n'empêche de le faire au milieu de celle-ci. La seule contrainte est que ceux qui ont besoin du contexte soient dans la descendance du Provider.

2. **Récupérer le contexte** dans un enfant

   Le contexte étant des sortes de propriétés venant d'ailleurs, il s'utilise presque pareil au niveau de l'enfant. Il faut juste bien faire attention à avoir défini la propriété statique `contextType`.

   Cependant, vu que l'API est instable, on va à nouveau faire un composant intermédiaire. Il va servir à relayer le contexte. On va l'appeler `Subscriber` pour se donner une convention.

   ```jsx
   function ThemeSubscriber(props, context) {
   	return props.children(context.theme);
   }

   ThemeSubscriber.propTypes = {
   	children: React.PropTypes.func.isRequired
   };

   ThemeSubscriber.contextTypes = themeType;
   ```

   L'astuce est d'utiliser le pattern [Function as Children](https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9). Ainsi, plutôt que de passer directement vos enfants React, vous passez une fonction qui retourne vos enfants. L'intérêt est de pouvoir passer une variable en plus à vos enfants. Concrètement, cela veut dire qu'à l'utilisation, votre `Subscriber` ressemblera à ça&nbsp;:

   ```jsx
   var theme = {color: '#ff0000'}

   <ThemeProvider theme={theme}>
     <ThemeSubscriber>
       {function (theme) {
         return (
           <button style={{color: theme.color}}>
             Mon bouton
           </button>
         )
       }}
     </ThemeSubscriber>
   </ThemeProvider>
   ```

   Ce pattern a l'avantage d'être explicite sur la provenance des variables en plus de ne pas trop compliquer l'écriture du `Subscriber`.

   > _Note&nbsp;: Je préfère cela dit le pattern HOC qui l'utilisation des composants plus lisibles. Mais cela demande d'être à l'aise avec les fonctions de fonctions en JavaScript. Ce sera donc pour un prochain article. :)_

## C'est magique&nbsp;! Il est où le piège&nbsp;?

Vous avez décidé de vivre dangereusement et vous voulez les utiliser parce que des changements d'API ne vous font pas peur. Vous avez même, maintenant, une paire de bonnes pratiques à appliquer pour que ce ne soit pas trop douloureux le jour où React décide que les contextes c'est oldschool.

Cependant, j'ai été un petit peu trop concis, quand j'ai dit que les contextes pouvaient être résumés à des propriétés invisibles. Il y a notamment une subtilité à connaître pour ne pas se faire avoir&nbsp;: si le contexte change, on ne peut pas être sûr que l'ensemble des enfants va se mettre à jour.

Je me suis fait rattrapé pour la première fois par cette subtilité en utilisant [Relay](https://facebook.github.io/relay/). C'est une librairie qui permet de vous connecter à une API GraphQL. A chaque fois que vous connectez un composant à Relay, la librairie fait des optimisations en utilisant la méthode de [`shouldComponentUpdate`](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate) sur vos composants. Il se trouve que cette méthode se base sur les _propriétés_ et l'_état_ du composant. Mais elle n'a pas connaissance de votre contexte. Du coup, quand mon `Provider` change son contexte, la modification se propage jusqu'au composant Relay, puis est bloquée par celui-ci et n'arrive donc pas à aller jusqu'à mon `Subscriber`. Zut.

Et ce cas n'est pas rare. Ce sera le cas à chaque fois que vous utilisez des librairies complexes (Relay, Redux, etc.) mais aussi sur vos propres composants si la performance devient importante. Quelles règles sur le contexte faut-il en tirer ?

La règle la plus simple est de ne pas dépendre du changement du contexte. En faisant cela, on n'a pas besoin de se préoccuper du `shouldComponentUpdate` puisqu'il n'y a plus d'`update`. Pour savoir si cette condition est remplie, vous pouvez vous poser les questions suivantes&nbsp;:

**Est-ce que j'ai besoin du contexte pour mon affichage ?**

--> Oui. **Est-ce que la donnée que j'affiche change dans le temps ?**

-->--> Oui. **Je vais devoir trouver une autre solution**.  
 ex&nbsp;: le nom de l'utilisateur connecté

-->--> Non. **Je peux utiliser le contexte**.  
 ex&nbsp;: la couleur du thème, l'URL de votre site, etc.

--> Non. **Je peux utiliser le contexte**.  
 ex&nbsp;: API pour logger, API pour récupérer des données, etc.

Il existe tout de même un méthode pour contourner cette limitation. Il faut pour cela _écouter_ les changements de contexte. Mais je pense qu'il y a déjà suffisamment à ingérer dans cet article. Ce sera pour la prochaine fois. :)

En attendant, vous pouvez jouer avec le contenu de cet article sur ce [jsFiddle](http://jsfiddle.net/3qd3rn0a/).

Si vous avez des questions, si un point n'est pas clair ou si vous avez juste envie de discuter n'hésitez pas à me [contacter](https://twitter.com/JulienPradet).

A la semaine prochaine&nbsp;!

**MaJ :** [Partie 2](/fiches-techniques/les-contextes-sans-les-problemes-en-react-2/)

---

Sources complémentaires&nbsp;:

- [React Context](https://facebook.github.io/react/docs/context.html)
- [Function as Children](https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9)
