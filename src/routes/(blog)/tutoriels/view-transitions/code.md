```js
function selectItem(item) {
	document.startViewTransition(async () => {
		// La fonction goToPage doit bien faire attention
		// à afficher la page avec comme source la petite image
		goToPage(item);

		const src = await loadImage(`/image/item/${item}/big`)
        // Une fois seulement que la grande image a été téléchargée
        // (et donc mise en cache), alors on vient l'utiliser
        // dans la page.
        replacePageImageWith(src);
	});
}

/**
 * Essaye de télécharger une image et résout la promesse
 * dès que celle-ci a fini de se télécharger
 */
async function loadImage(src: string) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.addEventListener('load', () => {
            resolve(src);
        });
        img.addEventListener('error', (error) => {
            reject(error);
        });

        img.src = src;

        // L'image peut avoir déjà été téléchargée.
        // Dans ce cas, l'event `load` n'est pas
        // déclenché. Il faut donc vérifier cela
        // manuellement.
        if (img.complete) {
            resolve(src);
        }
    });
}
```

Sauf si vous avez des yeux bioniques, je suis prêt à parier que dans une navigation normale, vous ne remarquerez pas la différence. Mais dans le cas d'un réseau lent, ça fera toute la différence.
