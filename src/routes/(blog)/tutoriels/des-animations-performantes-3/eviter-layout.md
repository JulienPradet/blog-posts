## Comment éviter le _Layout Thrashing_&nbsp;?

La première solution qui vient à l'esprit est de décaler les opérations pour que la récupération des données du DOM se fasse d'un coup, puis que la mise à jour du DOM s'effectue dans un deuxième temps. Ainsi, cela donnerait quelque chose de ce style là&nbsp;:
