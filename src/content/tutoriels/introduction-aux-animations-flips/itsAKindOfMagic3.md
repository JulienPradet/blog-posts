Si vous inspectez l'élément dans votre navigateur, vous verrez qu'en fait, le fond blanc n'est plus unique, mais respecte la structure suivante&nbsp;:

```html
<div>
    <div style="background: white">
        <button>Bouton</button>
    </div>
    <div style="position: relative">
        <!-- Fond animé -->
        <div style="background: white; height: 40px" />
        <!-- Contenu animé -->
        <div style="position: absolute">
            Contenu
        </div>
    </div>
</div>
```

Pour que les éléments puissent être animés individuellement, on a recours à des positions `absolute`, des hauteurs définies en JavaScript, etc.

De fait, c'est compliqué parce qu'on est obligé de détourner ce que sait déjà bien faire un navigateur, et surtout, parce qu'il est difficile de sortir un pattern qui marchera dans n'importe quelle situation. Par contre, au niveau performance, c'est quasi imbattable.

Ainsi, quand c'est le contenu qui change et que vous vous demandez si vous pouvez utiliser FLIP, la réponse est : ça dépend de où vous souhaiter positionner le marqueur entre performance et maintenance. Ce n'est jamais facile à déterminer et généralement, je conseille de commencer par privilégier la maintenance puis de benchmarker pour s'adapter en conséquence.

## Conclusion

Les animations FLIP ne sont pas une solution miracle. Par contre, c'est une technique qu'il est toujours bon d'avoir dans son sac.

Si vous voulez voir comment j'ai codé les exemples, c'est du React et c'est [accessible sur github](https://github.com/JulienPradet/blog-posts/blob/a371cef950777e149193396eb488ab80f4a24830/src/content/posts/introduction-aux-animations-flips/scaleSolution.js). Le code est un peu crado, mais je vous prépare un article plus complet en me concentrant sur l'implémentation en React :)

En attendant, si vous avez des questions ou si vous connaissez d'autres patterns performants pour réaliser des animations sur le web, n'hésitez pas à venir me voir sur Twitter&nbsp;: ce sera avec plaisir&nbsp;!

------

Sources complémentaires :

* [FLIP your animations](https://aerotwist.com/blog/flip-your-animations/)
* [flipjs](https://github.com/googlechrome/flipjs)
* [react-flip-move](https://github.com/joshwcomeau/react-flip-move)  
