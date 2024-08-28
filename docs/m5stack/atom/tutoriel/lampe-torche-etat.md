# Tutoriel: Lampe torche avec relation d'etat

## Préalable(s)

- [Tutoriel: Lampe torche avec une relation directe](/m5stack/atom/tutoriel/lampe-torche-directe.md)

## Le code préalable à intégrer

1) Partir du code du [Tutoriel: Lampe torche avec une relation directe](/m5stack/atom/tutoriel/lampe-torche-directe.md) dans un nouveau projet Arduino.

## Le code à ajouter pour que le bouton alterne l'etat du pixel

### Dans _l'espace global_

1) Ajouter une variable pour conserver l'état :
```cpp
bool monEtatBouton;
```

### Dans _setup()_

Ajouter le code suivant après l'animation de démarrage.

1) Initialiser la variable d'état :
```cpp
monEtatBouton = false;
```

2) Ajuster la valeur du pixel selon l'etat :
```cpp
if ( monEtatBouton == true ) {
    pixel = CRGB(255,255,255); 
} else {
    pixel = CRGB(255,255,255); 
}
FastLED.show();
```

3) Optimiser le code en enlevant le `== true` implicite :
```cpp
if ( monEtatBouton ) {
    pixel = CRGB(255,255,255); 
} else {
    pixel = CRGB(255,255,255); 
}
FastLED.show();
```

### Dans _loop()_

1) Pour allumer le pixel avec le bouton :
```cpp
if ( M5.Btn.isPressed() ) {
    pixel = CRGB(255,255,255); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
    FastLED.show();
}
```

2) Pour éteindre le pixel avec le bouton :
```cpp
if ( M5.Btn.isReleased() ) {
    pixel = CRGB(0,0,0); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
    FastLED.show();
}
```

3) Combiner les deux conditionnelles avec `else` parce qu'elles sont exclusives (une ou l'autre peut avoir effet, mais pas les deux en même temps) :
```cpp
if ( M5.Btn.isPressed() ) {
    pixel = CRGB(255,255,255); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
    FastLED.show();
} else if ( M5.Btn.isReleased() ) {
    pixel = CRGB(0,0,0); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
    FastLED.show();
}
```

4) Optimiser le code; `M5.Btn.isReleased()` est redondant parce que c'est le contraire de `M5.Btn.isPressed()`; la répétition de `FastLED.show()` peut être évitée :
```cpp
if ( M5.Btn.isPressed() ) {
    pixel = CRGB(255,255,255); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
} else {
    pixel = CRGB(0,0,0); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
}
FastLED.show();
```