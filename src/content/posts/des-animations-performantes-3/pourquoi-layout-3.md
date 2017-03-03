Cependant, si vous allez voir dans les DevTools, dans le deuxième cas de figure, vous auriez une timeline qui ressemble à ceci&nbsp;:

<figure tabindex="0">
<img src="/images/posts/des-animations-performantes/layout-thrashing.png" alt="Illustration du Layout Thrashing" />
<figcaption>Les rectangles violets ont des petits drapeaux rouges</figcaption>
</figure>

Et si vous passez la souris sur ces petits drapeaux rouges, vous pouvez lire&nbsp;: *Forced reflow is likely a performance bottleneck*. En d'autres termes, dans le code JavaScript il y a une opération qui oblige le navigateur à recalculer le layout. Comment est-ce possible&nbsp;?

Cela s'explique par le fait qu'accéder à des propriétés du DOM n'est pas gratuit. Regardons plutôt ce que fait le code suivant&nbsp;:
