Vous avez peut-être entendu parler des [View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions?hl=en) ? C'est la nouvelle API dans les navigateurs qui, avec une ligne de CSS et une ligne de JS promet d'animer vos transitions de manière performante.

Des démos assez chouettes sont déjà disponibles notamment autour de l'écosystème Astro. Par exemple avec :

<ul style="display: flex;padding: 0;gap: 1rem;">
<li style="min-width: 150px; margin: 0;list-style: none;">
<a href="https://live-transitions.pages.dev/" rel="nofollow"><img src="/images/posts/view-transitions/playlist.jpg" width="164" height="200" style="display: block;margin-left: 0;min-height: 200px;object-fit:cover" /></a>
<p><a href="https://live-transitions.pages.dev/" rel="nofollow">Playlists</a><br>(<a href="https://github.com/Charca/view-transitions-live" rel="nofollow">Code&nbsp;source</a>)</p>
</li>
<li style="min-width: 150px; margin: 0;list-style: none;">
<a href="https://astro-records.pages.dev/album/2177412" rel="nofollow"><img src="/images/posts/view-transitions/music-library.jpg" width="233" height="200" style="min-height: 200px;object-fit:cover;object-position:center right;"/></a>
<p><a href="https://astro-records.pages.dev/" rel="nofollow">Music Library</a><br>(<a href="https://github.com/Charca/astro-records" rel="nofollow">Code&nbsp;source</a>)</p>
</li>
</ul>

En ce qui nous concerne, on va se concentrer sur un cas : passer d'une liste contenant plusieurs articles imagés à une pleine page qui reprend la même image dans son header.

C'est assez classique, mais cela représente plusieurs difficultés :

- Comment s'assurer que l'animation de l'image se fasse correctement dans les deux sens ?
- Comment éviter de dégrader les performances en n'animant que ce qui est nécessaire ?
- Les dimensions entre la vue liste et la vue pleine page sont assez différentes : comment faire pour que l'animation soit tout de même fluide ?
- Comment éviter des flashs pendant le chargement de l'image pleine page ?

> 💡 Attention ce n'est pour l'instant disponible que sur les navigateurs basés sur Chromium. Mais les autres navigateurs ont donné leur accord sur l'API et vont donc l'implémenter dans les années à venir. De plus, cet article se concentrera uniquement sur les animations déclenchées en JavaScript. Nous ne nous attarderont pas sur le cas des Multi Pages Applications (MPAs) qui ne sont pas encore sorties du mode expérimental dans Chromium.

## Présentation de l'API View Transition

Avant de rentrer dans le cœur du sujet, prenons un exemple sans animation :
