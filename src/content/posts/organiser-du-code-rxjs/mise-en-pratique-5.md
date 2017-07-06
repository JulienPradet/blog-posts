
L'envoi des messages au serveur peut sembler un poil alambiqué si vous n'êtes pas habitués à Rx. mais n'est pas si terrible que ça parce que &nbsp;:
* vous allez vous habituer à Rx :P
* ça pourrait être fait différemment&nbsp;: on pourrait envisager d'ecrire `sentMessages$` de manière plus impérative à l'aide d'un `Observable.create` comme montré dans mon précédent tuto /!\\ TODO /!\\
* la partie compliquée est petite et isolée&nbsp;: ça peut donc être refactoré à loisir

Mais globalement, on peut dire que quand même, on a le droit de faire un deuxième saut de joie. Pour ajouter des messages d'une source totalement différente, nous n'avons quasiment pas modifié le code qui existait déjà et dans le code ajouté est relativement concis.

Donc on est content, mais dans l'ensemble on n'a quand même rien fait de très compliqué en terme applicatif. On va donc essayer de mettre en place quelque chose qui demande un petit peu plus de travail en temps normal et qui est de plus en plus demandé de nos jours&nbsp;: de l'Optimistic Update.
