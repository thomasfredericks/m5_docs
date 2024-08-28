# Intervalle de temps avec millis()


## Préalable(s)

- [L'instruction Arduino millis()](/arduino/millis.md)


## À ajouter dans l'espace global (au début du code)

Créer une variable **globale** pour mettre en mémoire le temps de départ du chronomètre:
```cpp
unsigned long monChronoDepart = 0; // DEPART DE MON CHRONOMÈTRE
```
### Configuration dans *setup()*

Il n'y a rien à configurer dans *setup()*.

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

