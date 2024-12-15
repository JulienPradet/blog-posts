J'ai utilisé ces `box-shadows` hiddeuses pour avoir quelque chose qui lag sur desktop. Cependant, dans la vraie vie, ce cas se présente plutôt lorsque vous avez beaucoup de contenu dans l'élément animé.

## Eviter les _repaints_

Maintenant qu'on sait identifier ce qui pose problème, vous vous en doutez, le but va être de forcer la création de nouveaux _layers_.

Il y a une propriété faite exprès pour ça&nbsp;: `will-change`. Celle-ci prévient le navigateur qu'une propriété va changer durant l'animation à venir. Le navigateur va alors créer un layer séparé pour optimiser l'affichage.

```css
.class {
	will-change: transform;
}
```
