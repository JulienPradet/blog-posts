[React Router](https://github.com/ReactTraining/react-router) est une librairie qui affiche vos composants en fonction de l'URL de votre navigateur. En gros, c'est indispensable si vous voulez faire une <abbr title="Single Page Application">SPA</abbr> et que vous voulez que l'utilisateur puisse croire que c'est un site normal qu'il peut partager, bookmarker, etc.

C'est donc un composant essentiel de votre application qui devra gérer tous les cas de figure : <abbr title="Server Side Rendering">SSR</abbr>, Testing, Code Splitting, Authentification, etc. On est donc bien content quand une lib s'en charge pour nous.

A l'heure où j'écris cet article, la [v4](https://reacttraining.com/react-router/) est en *beta*. Cependant, j'utilise déjà depuis un moment la v4 *alpha* sur mes projets persos. Sûrement parce que je suis un **#coolkid** mais surtout parce qu'elle me paraît plus intuitive et s'incorpore mieux dans les projets React. C'est ce que je vais essayer de détailler dans cet article.

### Comment c'était avant ?

Historiquement, la lib est inspirée par le Router de [Ember](http://emberjs.com/) et a été créée par [Ryan Florence](https://twitter.com/ryanflorence) et [Michael Jackson](https://twitter.com/mjackson). En haut de votre application, vous définissiez l'ensemble des routes qui constituent votre application et le Router se débrouille pour afficher les bons composants au bon moment.

Concrètement, ça ressemblait à ça :

```jsx
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Home} />
      <Route path='about' component={About} />
      <Route path=':article' component={Article} />
    </Route>
  </Router>,
  domElement
)
```

En prenant cette configuration de routes, si vous êtes sur l'url `/`, c'est comme si vous aviez écrit :

```jsx
<Layout>
  <Home />
</Layout>
```

Si vous êtes sur `/super-article-qu-il-faut-partager`, ce serait plutôt :

```jsx
<Layout>
  <Article params={{
    article: 'super-article-qu-il-faut-partager'
  }} />
</Layout>
```

Ca marchait plutôt bien en vrai. Mais les créateurs de la librairie ont décidé de tout changer. Oh les vilains&nbsp;!

### Maintenant c'est comment ?

Si on veut transformer l'exemple des routes du dessus, en pratique cela ressemblerait à ça :

```jsx
ReactDOM.render(
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path='/' render={() => (
          <Home />
        )} />
        <Route path='/about' render={() => (
          <About />
        )} />
        <Route path='/:article' render={({ match }) => (
          <Article id={match.params.article} />
        )} />
      </Switch>
    </Layout>
  </BrowserRouter>,
  domElement
)
```

Ce n'est pas très impressionnant et n'apporte pas beaucoup de valeur. En gros, pour faire cette transformation, on a :

* mis `Layout` directement dans le `ReactDOM.render` plutôt que dans une route
* entouré les routes filles dans un [`Switch`](https://reacttraining.com/react-router/#switch)
* et changé un peu l'API des routes (en vrai, vous pourriez rester sur la propriété [`component`](https://reacttraining.com/react-router/#route.component), mais j'aime beaucoup ce `render`)

Voilà, vous savez migrer vers la v4.

### Et en vrai, c'est quoi la différence ?

Parce que casser des APIs uniquement pour le plaisir, c'est pas franchement cool.

#### Peu importe la position des Routes

La première chose, c'est que les `Routes` peuvent être utilisées dans n'importe quel composant.

Ainsi, si `/:article` devait avoir les sous-routes `/:article/read` et `/:article/comment`, vous pourriez les définir directement dans le composant `Article` plutôt que de devoir le faire à la racine de votre application. Résultat&nbsp;: Vous pouvez enfin réellement découper votre application en mini-applications.

> *&ndash; Oulah, ça va fait des spaghettis ça&nbsp;!*

Non. La peur du spaghetti vient du fait qu'on ne connait pas d'avance la structure globale de l'ensemble de l'application. Mais quand on fait du React, **le but n'est pas de faire une *grosse* application, mais plein de *petites* applications**. D'une part, c'est plus facile de raisonner ainsi parce qu'il n'y a plus besoin de connaître tous les rouages pour savoir ce qu'on peut casser avec nos modifications. D'autre part on accède au graal du mode `plug-n-play`&nbsp;: pour rajouter toute la gestion des articles il n'y a qu'une `Route` à ajouter.

De plus, cela simplifie la gestion des besoins avancés tels que le <abbr title="Hot Module Replacement">HMR</abbr> (même si je n'en ressens pas le besoin sur des applications avec Router), le SSR, le Code Splitting, etc.

#### Autant de Routes que l'on veut

Avant, le Router choisissait à votre place la route affichée. La première qui *matchait* était élue grande gagnante et avait l'honneur d'apparaître sur votre page. Dorénavant, si vous enlevez le `Switch` et qu'une route *match* elle est affichée, y compris si celle au-dessus *match* aussi.

Concrètement, si j'utilise ce bout de code, et que je vais sur l'URL `/about`, qu'est ce qui est affiché ?

```jsx
ReactDOM.render(
  <BrowserRouter>
    <Layout>
      <Route path='/' render={() => <Home />} />
      <Route path='/about' render={() => <About />} />
      <Route path='/:article' render={({ match }) => <Article id={match.params.article} />} />
    </Layout>
  </BrowserRouter>,
  domElement
)
```

* `Home` va matcher étant donné que l'url commence par `/`
* `About` aussi vu que c'est exactement cette URL que l'on utilise
* `Article` aussi avec `"about"` pour `id` .

Je ne vous cache pas que pour le coeur des `Routes`, c'est embêtant. Mais depuis que la *beta* est là, [`Switch`](https://reacttraining.com/react-router/#switch) permet de répondre à ce besoin.

Par contre, pour tout le reste, c'est absoluement génial. Grâce à ça vous pouvez par exemple gérer votre menu et sous-menus avec les Routes !

```jsx
<ul>
  // 1. La Route est tout le temps affichée
  <Route path='/super-article' children={({match}) => (
    // 2. Affichage conditionnel
    <li className={match && match.isExact ? 'active' : ''}>
      // 3. Affichage permanent
      <Link to='/super-article'>Mon Super Article</Link>
      // 4. Affichage du sous-menu
      {match && (
        <ul>
          <Link to='/read'>Lire</Link>
          <Link to='/comment'>Commenter</Link>
        </ul>
      )}
    </li>
  )} />

  // Possible de rajouter d'autres routes ici
</ul>
```
  1. **La Route est tout le temps affichée**  
    Le but est de tout le temps afficher le lien vers mon article. Pour cela, il y a la propriété `children` qui force l'affichage de la Route. Cependant, l'objet `match` ne sera définit que si la Route correspond à l'URL en cours d'affichage.

  2. **Affichage conditionnel**  
    Je peux jouer sur l'affichage de cet élément en fonction de l'URL en cours de visite. Ici, je l'ai fait avec une classe, mais on pourrait imaginer ajouter une mini description, etc. (`isExact` permet de faire en sorte que ce soit exactement cette URL et pas une sous-route.)

  3. **Affichage permanent**  
    Il faut que mon lien soit tout le temps affiché pour amener vers mon article.

  4. **Affichage du sous-menu**  
    Le sous-menu ne doit s'afficher que lorsque l'URL correspond. J'ai mis des liens en dur dans la liste, mais on pourrait imaginer de nouvelles Routes.

Et le mieux dans tout ça, c'est que ce ne sont que des composants. Il est donc tout à fait possible de faire un composant qui simplifieras l'écriture finale :

```jsx
<ul>
  <MenuItem to='/super-article' label='Mon Super Article'>
    <ul>
      <Link to='/read'>Lire</Link>
      <Link to='/comment'>Commenter</Link>
    </ul>
  </MenuItem>
</ul>
```

Vous pourriez imaginer un comportement similaire pour un fil d'Ariane, des animations entre les pages, etc.

### Quelques bonnes pratiques

Si vous avez décider de faire le pas, il y a quelques conseils que je pourrais vous donner avant de vous aventurer dans la migration.

#### Simplifier l'API en la cachant

C'est un conseil commun à tout composant en React. Cependant, j'en ai ressenti particulièrement le besoin sur mes Routes.

En effet, dorénavant, beaucoup plus de possibilités s'offrent à vous avec le Router. Vous allez donc avoir un code avec parfois des logiques un petit peu plus tordues (beaucoup de conditions d'affichage). Le but sera d'isoler cette logique dans un composant pour ne laisser que le strict minimum apparaître à la surface. C'est ce que je propose avec le `MenuItem` présenté plus haut.

#### S'efforcer de faire des liens génériques

Dans une route, l'objet [`match`](https://reacttraining.com/react-router/#match) qui est passée au composant affiché contient la propriété `url`. Quand vous faites des liens dans votre application, efforcez-vous d'utiliser cette propriété pour rendre vos liens plus générique.

Concrètement, cela veut dire que si je suis sur la Route `/article` et que je veux faire un lien vers `/article/read`, je vais écrire mon lien ainsi&nbsp;:

```jsx
<Link to={match.url + '/read'}>Lire</Link>
```

En faisant cela, vous préserverez l'aspect `plug-n-play` de vos composants puisque s'ils changent d'URL de base, les liens fonctionneront toujours.

Si l'objet `match` est trop loin dans votre arbre de composant, vous pouvez toujours passer par le contexte avec [`withRouter`](https://reacttraining.com/react-router/#withrouter) qui contient lui aussi l'objet `match`.

#### Ne plus tester l'URL ou l'history et n'utiliser que des composants

Il serait en soit toujours possible de faire les mêmes hacks qu'avant en récupérant le contexte et jouant avec `history`. Cependant, les composants mis à disposition tels que [`Redirect`](https://reacttraining.com/react-router/#redirect) ou [`Prompt`](https://reacttraining.com/react-router/#prompt) serons sûrement mieux testés et plus générique que ce que vous ferriez. C'est vrai que c'est assez difficile de se faire à l'idée de mettre un Composant pour faire une action plutôt qu'un affichage, mais à l'utilisation, ça marche plutôt bien.

#### Tester vos composants

Si vous testez vos composants et que ceux-ci contiennent des `Links` ou des `Routes`, vous aurez un problème. Cependant, il existe un composant qui s'appelle `MemoryRouter` qui vous sauvera la mise. Il remplacera le `BrowserRouter` qui manquera dans vos tests.

#### Lire la doc

[La doc est très bien faite](https://reacttraining.com/react-router) et vous présente plein de cas qui vous permettrons d'explorer les possiblités qu'offre ce nouveau Router.

### Prêts à sauter le pas ?

C'est toujours en beta, alors oui, ça fait peur.

Mais si vous commencez un nouveau projet, je vous conseille vivement de partir dessus. C'est toujours agréable de travailler avec des librairies qui vous apprennent des choses sans vous barrer la route <small>(héhé)</small>.

Si vous avez déjà du code en production, la migration sera peut-être un petit peu plus délicate. Cela dit, ils ont fait beaucoup d'efforts avec la beta pour faciliter cette étape.

En tout cas, si un point n'est pas clair ou si vous avez juste envie de commenter, n'hésitez pas à venir [me poser des questions](https://twitter.com/JulienPradet). :)

----

Sources complémentaires :

* [React Router - Github](https://github.com/ReactTraining/react-router)
* [React Router V4 - Documentation](https://reacttraining.com/react-router)
