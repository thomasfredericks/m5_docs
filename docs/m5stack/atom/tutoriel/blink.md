# Tutoriel: le code test «Blink»

## Préalable(s)

- [Configurer Arduino IDE pour M5Stack Atom](/m5stack/atom/configuration.md)

## Le code minimal

```cpp
// Le code minimal pour le M5Stack Atom

#include <M5Atom.h>  // Inclure la librairie M5 (version pour M5Atom) https://github.com/m5stack/M5Atom

void setup() {
  M5.begin(false, false, false);  // Démarrer la libraire M5 avec toutes les options désactivées
}

void loop() {
  M5.update();  // Toujours inclure M5.update() au début de loop()
}
```

## Le code à ajouter

### Dans l'espace global

Noud déclarons une variable  `pixel` :
```cpp
CRGB pixel;  // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
```

### Dans _setup()_

Nous initialisons le  `pixel` :
```cpp
FastLED.addLeds<WS2812, DATA_PIN, GRB>(&pixel, 1);  // Ajouter le pixel du M5Atom à FastLED
```

### Dans _setup()_ ou _loop()_

Pour allumer le pixel :
```cpp
  // Allumer le pixel et attendre 100 millisecondes
  pixel = CRGB(255,255,255); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
  FastLED.show();
  delay(100);
```

Pour éteindre le pixel :
```cpp
  // Allumer le pixel et attendre 100 millisecondes
  pixel = CRGB(255,255,255); // CRGB est défini par FastLed https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
  FastLED.show();
  delay(100);
```