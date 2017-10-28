Pour représenter un tel schéma, j'écris des lignes de code qui ressemblent à ça&nbsp;:

```jsx
const Schema = () => (
  <Viz>
    <Line legend="sendMessageRequest$">
      <Element
        color={firstColor}
        preview="req1"
        value={{
          action: "send_message",
          message: { content: "Bonjour !" }
        }}
      />
    </Line>
    <Line legend="sendMessageResponse$$">
      <ObservableElement color={firstColor}>
        <Element
          preview="req1"
          value={{
            action: "send_message",
            message: { content: "Bonjour !" }
          }}
        />
      </ObservableElement>
    </Line>
  </Viz>
)
```

Je trouve ça assez agréable à utiliser et je génère rapidement des schémas à l'aide de cet outil.

> *&ndash; C'est du XML quoi...*, dit-iel, levant les yeux au ciel.

Oui, mais le but de cet article est plutôt de se concentrer sur le placement des éléments SVG plutôt que sur la partie React. Ainsi, pour mieux comprendre comment j'en suis arrivé à ça, on va tout réécrire pour voir comment j'ai pu en arriver à cette solution.

## Construisons un arbre

Nous n'allons pas refaire la bibliothèque sur les Observables car ce serait trop complexe à faire tenir dans un seul article. Nous allons plutôt représenter l'arbre suivant&nbsp;:
