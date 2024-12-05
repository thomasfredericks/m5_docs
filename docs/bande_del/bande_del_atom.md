# Contrôler une bande de DEL avec un M5Stack Atom

## Introduction

Le modèle de bande de DEL utilisé ici est le WS281X (le X indique que le dernier chiffre n’est pas important). Elle fonctionne avec une tension d'alimentation à 12V.

De façon générale, elle est aussi connue sous le nom de **NeoPixel**. Elle a été popularisée et baptisée en Amérique par la compagnie Adafruit. Adafruit fournit [plusieurs modèles de NeoPixel](https://www.adafruit.com/category/168). Cependant, les NeoPixels d'Adafruit fonctionnent à 5 Volts. Toutefois, leur système de contrôle est identique à celui de la bande de DEL utilisées ici. 

![Différents modèles de bandes de DEL](./bande_del_modeles.svg)

## Ordre des couleurs des DEL

Pour chaque modèle de bande de DEL, les couleurs sont disposées dans un certain ordre: RGB, GRB, BGR, etc. **Dans notre cas, l'ordre est : RGB**.

## Broches

Les NeoPixels possèdent au moins 3 broches qui doivent toutes être connectées :
* GND.
* Alimentation (5V, 12V ou 24V selon les modèles).
* Entrée de données (*Data In*).

Les WS281X 12V possèdent 4 broches (la broche supplémentaire est optionnelle) :
* **GND**.
* **+12V** pour l'alimentation.
* **DI** pour l'entrée de données.
* **BI** dont l'utilisation est optionnelle et utilisée seulement en cas de bris d'un segment.

## Branchement

![Couper un segment de bande de DEL](./Diapositive1.SVG)

![Enlever soigneusement le revêtement sur la partie cuivrée coupée](./Diapositive2.SVG)

![Schéma du montage a effectuer](./bande-del_atom_schema.png)

![Effectuer la connexion avec le connecteur sans soudure du côté du multi-câble](./bande-del_connecteur_cote-cable.png)

![Attention, les bandes de DEL ont un sens: connectez vous du côté du DI (Data Input) et non du DO!](./bande_del_sens.svg)

![Effectuer la connexion avec le connecteur sans soudure du côté de la bande](./bande-del_connecteur_cote-bande.png)

![Photo du montage effectué](./bande-del_atom_photo.png)

![Les bandes peuvent être allongées en connectant les DO aux DI des bandes suivantes](./bande_del_extension_schema.svg)


### Bonnes pratiques

Adafruit recommande les bonnes pratiques de connexion suivantes : [Best Practices | Adafruit NeoPixel Überguide | Adafruit Learning System](https://learn.adafruit.com/adafruit-neopixel-uberguide/best-practices).

## Bibliothèque FastLED

**Les bibliothèques de bandes de DEL supportent souvent plusieurs modèles. On doit sélectionner le bon modèle dans le code!**  Il est recommandé d'utiliser la bibliothèque [FastLED](https://github.com/FastLED/FastLED) qui peut être installée à partir du gestionnaire de bibliothèques. FastLED est trèes performante, mais un êu compliquée à utiliser. 

### À ajouter à l'espace global

```cpp
#define NOMBRE_PIXELS 30 
CRGB mesPixels[NOMBRE_PIXELS];
```

### À ajouter dans setup()

Il faut ajouter les pixels à FastLED. Le 26 c'est le numéro de la broche du Atom qui envoie les données à la bande de pixels.

```cpp
FastLED.addLeds<WS2812, 26, RGB>(mesPixels, NOMBRE_PIXELS);
```

### Dans loop()

Pour changer la couleur d'un pixel, changer sa couleur CRGB dans le tableau. Par exemple, pour changer la couleur du pixel à l'index 13 :
```cpp
int indexDuPixel = 13;
int rouge = 255;
int vert = 255;
int bleu = 255;
mesPixels[indexDuPixel] = CRGB( rouge , vert, bleu);
```
Par après, mettre à jour les pixels de la bande de DEL :
```cpp
FastLED.show();
```

### Exemple de code FastLED avec des animations

```cpp
// Le code de base pour le M5Stack Atom

// Inclure la librairie M5 (version pour M5Atom) :
// https://github.com/m5stack/M5Atom
#include <M5Atom.h>

// Inclure la librairie FastLED qui va gérer le pixel :
// https://github.com/FastLED/FastLED
#include <FastLED.h>

// Un tableau qui contient une variable de type CRGB.
// Il y a un seul pixel, mais il doit être dans un tableau.
// CRGB est un type de couleur défini par la lirairie FastLed :
// https://github.com/FastLED/FastLED/wiki/Pixel-reference#crgb-reference
CRGB monPixelAtom[1];

#define MA_BANDE_DEL_COMPTE 30
CRGB maBandeDel[MA_BANDE_DEL_COMPTE];

unsigned long monChronoStart;

int monAnimation = 6;

// Utiliser les trois commandes suivantes si la bande est connectée au pbHub
/*
#include <M5_PbHub.h>
M5_PbHub myPbHub;
#define MA_BANDE_DEL_CANAL 3
*/

void setup() {
  // Démarrer la libraire M5 avec toutes les options de pré-configuration désactivées :
  M5.begin(false, false, false);

  // Démarrer la connexion sérielle :
  Serial.begin(115200);

  // Ajouter le pixel (il y en a un seul) du M5Atom à la librairie FastLED :
  FastLED.addLeds<WS2812, DATA_PIN, GRB>(monPixelAtom, 1);

  // Utiliser FastLED.addLeds si la bande est connectée directement à l'ATOM
  FastLED.addLeds<WS2812, 26, RGB>(maBandeDel, MA_BANDE_DEL_COMPTE);
  // Utiliser les deux commandes suivantes si la bande est connectée au pbHub
  /*
  myPbHub.begin();
  myPbHub.setPixelCount(MA_BANDE_DEL_CANAL, MA_BANDE_DEL_COMPTE);
  */

  // Animation de démarrage
  while (millis() < 5000) {
    monPixelAtom[0] = CHSV((millis() / 5) % 255, 255, 255 - (millis() * 255 / 5000));
    FastLED.show();
    delay(50);
  }
  monPixelAtom[0] = CRGB(0, 0, 0);
  FastLED.show();
}

void loop() {
  // Toujours inclure M5.update() au début de loop() :
  M5.update();

  if (millis() - monChronoStart >= 50) {
    monChronoStart = millis();
  
    Serial.println(millis());

    uint8_t hue = millis() / 50;

    if (monAnimation == 0) {
      rainbow(maBandeDel, MA_BANDE_DEL_COMPTE, hue);  // run simulation frame
    } else if (monAnimation == 1) {
      rainbowWithGlitter(maBandeDel, MA_BANDE_DEL_COMPTE, hue);
    } else if (monAnimation == 2) {
      confetti(maBandeDel, MA_BANDE_DEL_COMPTE, hue);
    } else if (monAnimation == 3) {
      sinelon(maBandeDel, MA_BANDE_DEL_COMPTE, hue);
    } else if (monAnimation == 4) {
      bpm(maBandeDel, MA_BANDE_DEL_COMPTE, hue);
    } else if (monAnimation == 5) {
      juggle(maBandeDel, MA_BANDE_DEL_COMPTE, hue);
    } else { 
      int count = (millis() / 1000) % 30;
      fill_solid( maBandeDel, MA_BANDE_DEL_COMPTE, CRGB( 0, 0, 0) );
      for (int i=0; i < count ; i++ ) {
        maBandeDel[i] = CRGB( 255, 255, 255);
      }
    }

    // Utiliser FastLED.show() si la bande est connectée directement à l'ATOM
    FastLED.show();
    // Utiliser le *for* suivant si la bande est connectée au pbHub
    /*
    for (int i = 0; i < MA_BANDE_DEL_COMPTE; i++) {
      myPbHub.setPixelColor(MA_BANDE_DEL_CANAL, i, maBandeDel[i].r, maBandeDel[i].g, maBandeDel[i].b);
    }
    */
  }
}


void rainbow(CRGB* leds, int ledsCount, uint8_t gHue) {
  // FastLED's built-in rainbow generator
  fill_rainbow(leds, ledsCount, gHue, 7);
}

void addGlitter(CRGB* leds, int ledsCount, fract8 chanceOfGlitter) {
  if (random8() < chanceOfGlitter) {
    leds[random16(ledsCount)] += CRGB::White;
  }
}

void rainbowWithGlitter(CRGB* leds, int ledsCount, uint8_t gHue) {
  // built-in FastLED rainbow, plus some random sparkly glitter
  rainbow(leds, ledsCount, gHue);
  addGlitter(leds, ledsCount, 180);
}



void confetti(CRGB* leds, int ledsCount, uint8_t gHue) {
  // random colored speckles that blink in and fade smoothly
  fadeToBlackBy(leds, ledsCount, 10);
  int pos = random16(ledsCount);
  leds[pos] += CHSV(gHue + random8(64), 200, 255);
}

void sinelon(CRGB* leds, int ledsCount, uint8_t gHue) {
  // a colored dot sweeping back and forth, with fading trails
  fadeToBlackBy(leds, ledsCount, 20);
  int pos = beatsin16(13, 0, ledsCount - 1);
  leds[pos] += CHSV(gHue, 255, 192);
}

void bpm(CRGB* leds, int ledsCount, uint8_t gHue) {

  // colored stripes pulsing at a defined Beats-Per-Minute (BPM)
  uint8_t BeatsPerMinute = 62;
  CRGBPalette16 palette = PartyColors_p;
  uint8_t beat = beatsin8(BeatsPerMinute, 64, 255);
  for (int i = 0; i < ledsCount; i++) {  //9948
    leds[i] = ColorFromPalette(palette, gHue + (i * 2), beat - gHue + (i * 10));
  }
}

void juggle(CRGB* leds, int ledsCount, uint8_t gHue) {
  // eight colored dots, weaving in and out of sync with each other
  fadeToBlackBy(leds, ledsCount, 20);
  uint8_t dothue = 0;
  for (int i = 0; i < 8; i++) {
    leds[beatsin16(i + 7, 0, ledsCount - 1)] |= CHSV(dothue, 200, 255);
    dothue += 32;
  }
}
```

