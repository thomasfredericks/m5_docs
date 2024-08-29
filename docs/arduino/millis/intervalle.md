# Intervalle de temps avec millis()


## Préalable(s)

La fonction `millis()` retourne le temps en millisecondes depuis le démarrage de la carte Arduino. 

Le temps étant compté en millisecondes, la valeur du temps va augmenter très rapidement et son type doit être assez grand pour pouvoir la stocker sans erreur. Le type `unsigned long` est ainsi utilisé pour stocker le temps. Lorsqu'un type de données est indiqué «non signé», il ne peut être que positif. En éliminant les valeurs négatives, cela permet de compter avec deux fois plus de valeurs postives. Un `unsigned long` peut compter jusqu'à `4294967295`. C’est assez d’espace pour stocker le temps pour 49 jours. Après 49 jours, le temps recommence à compter à partir de `0`.

## À ajouter dans l'espace global (au début du code)

Créer une variable **globale** pour mettre en mémoire le temps de départ du chronomètre:
```cpp
unsigned long monChronoDepart ; // DEPART DE MON CHRONOMÈTRE
```
### Configuration dans *setup()*

On inialise le temps de départ:
```cpp
monChronoDepart = millis(); // TEMPS DE DÉPART
```

### Utilisation dans *loop()*

Pour calculer le temps écoulé on utilise l'extrait suivant: 
```cpp
( millis() - monChronoDepart ) // TEMPS ÉCOULÉ DE MON CHRONOMÈTRE
```

On peut vérifier si le temps écoulé dépasse 50 millisecondes avec l'extrait suivant:
```cpp
( millis() - monChronoDepart >= 50 ) // TEMPS ÉCOULÉ DE MON CHRONOMÈTRE
```

On peut redémarrer la mesure du temps avec le code suivant:
```cpp
monChronoDepart = millis(); // REDÉMARRER LE CHRONOMÈTRE
```

On combine ces deux extraits ainsi, pour un intervalle de 50 millisecondes :
```cpp
if ( millis() - monChronoDepart >= 50 ) { // SI LE TEMPS ÉCOULÉ DÉPASSE 50 MS...
      monChronoDepart = millis(); // ...REDÉMARRER LE CHRONOMÈTRE...
      // CETTE SECTION SERA EXÉCUTÉE À CHAQUE 50 MS
      // AJOUTER LE CODE À RÉPÉTER ICI
}
```
