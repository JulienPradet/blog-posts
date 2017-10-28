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

Mais la raison de cet article, est que j'ai appliqué une technique qui sort de mes habitudes pour construire mes composants React&nbsp;: **ils renvoient `null` dans leur fonction `render`**. Que ce soit `Line`, `Element` ou `ObservableElement`, ils renvoient tous `null`.

**Wait, what&nbsp;? Render `null`&nbsp;? Pourquoi&nbsp;?**

Oui, ça ne paraît pas spécialement évident au premier abord. Ca paraît même plutôt contre-intuitif. Pour mieux comprendre mon raisonnement, on va tout réécrire pour voir comment j'ai pu en arriver à cette solution.

## Construisons un arbre

Nous n'allons pas refaire la bibliothèque sur les Observables car ce serait trop complexe à faire tenir dans un seul article. Nous allons plutôt représenter l'arbre suivant&nbsp;:
