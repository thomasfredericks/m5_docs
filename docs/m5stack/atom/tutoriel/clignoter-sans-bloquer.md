# Tutoriel: Clignoter sans bloquer

## Préalable(s)

- [Tutoriel: «Blink» au démarrage](/m5stack/atom/tutoriel/blink_demarrage.md)
- [Intervalle avec millis()](/arduino/millis/intervalle.md)

## Le code préalable à intégrer

1) Transcrire le code du [Tutoriel: «Blink» au démarrage](/m5stack/atom/tutoriel/blink_demarrage.md) dans un nouveau projet Arduino.

## Le nouveau code à ajouter

### Dans _l'espace global_

1) Ajouter une variable  **globale**  pour conserver l'état du pixel :
```cpp
bool monEtatPixel;
```

2) Ajouter une variable  **globale** pour mettre en mémoire le temps de départ du chronomètre:
```cpp
unsigned long monChronoPixel = 0; // DEPART DE MON CHRONOMÈTRE
```

### Dans _setup()_

Ajouter le code suivant après l'animation de démarrage.

1) Initialiser la variable d'état :
```cpp
monEtatPixel = false;
```

2) Ajuster la valeur du pixel selon l'etat :
```cpp
if ( monEtatPixel ) {
    pixel = CRGB(255,255,255); 
} else {
    pixel = CRGB(0,0,0); 
}
FastLED.show();
```
3) On inialise le temps de départ:
```cpp
monChronoPixel = millis(); // TEMPS DE DÉPART
```

### Dans _loop()_

On ajoute le code suivant après `M5.update()` :
```cpp
if ( millis() - monChronoDepart >= 250 ) { // SI LE TEMPS ÉCOULÉ DÉPASSE 250 MS...
      monChronoPixel = millis(); // ...REDÉMARRER LE CHRONOMÈTRE...
      // CETTE SECTION SERA EXÉCUTÉE À CHAQUE 50 MS
      monEtatPixel = !monEtatPixel;
}

if ( monEtatPixel ) {
    pixel = CRGB(255,255,255); 
} else {
    pixel = CRGB(0,0,0); 
}
```

