# Tutoriel: le code test «Blink»

## Préalable(s)

- [Configurer Arduino IDE pour M5Stack Atom](/m5stack/atom/configuration.md)
- [Copier le code de base du M5Stack Atom](/m5stack/atom/code-base.md)

## Le code à ajouter

### Dans l'espace global

Nous n'ajoutons rien dans l'espace global, mais nous utiliserons la variable `pixel` du code de base.

### Dans _setup()_

Nous n'ajoutons rien dans _setup()_, puisque le pixel est déjà initialisé dans le code de base : `FastLED.addLeds<WS2812, DATA_PIN, GRB>(&pixel, 1);`.

### Dans _loop()_

Pour allumer le pixel :

```cpp
  // Allumer le pixel et attendre 100 millisecondes
  pixel = CRGB(255,255,255);
  FastLED.show();
  delay(100);
```

Pour éteindre le pixel :

```cpp
  // Allumer le pixel et attendre 100 millisecondes
  pixel = CRGB(255,255,255);
  FastLED.show();
  delay(100);
```