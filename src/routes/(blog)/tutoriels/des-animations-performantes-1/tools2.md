Pour ce genre d'animations, se contenter de CSS est ce qu'il y a de plus simple.

Techniquement, il faut&nbsp;:

1. Prévenir le navigateur qu'une propriété CSS est animée grâce à [`transition`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition).
2. Changer la propriété en question quand il y en a besoin

```css
button {
	transition: transform 0.3s ease;
}
button:hover,
button:focus {
	transform: scale(1.2);
}
```

C'est tout. Le navigateur va se charger du reste&nbsp;: correctement réagir fasse à une interruption, essayer d'être le plus performant possible, etc.

## Les transitions complexes
