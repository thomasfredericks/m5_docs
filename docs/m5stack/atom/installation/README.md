# Installation de M5Stack Atom dans Arduino

## Préalable(s)

- [Télécharger et configurer Arduino IDE](arduino/ide/README.md)

## Page du produit

 [ATOM Lite ESP32 IoT Development Kit | m5stack-store](https://shop.m5stack.com/products/atom-lite-esp32-development-kit)


## Ajouter M5Stack à Arduino (à effectuer une fois)

### Ajouter le gestionnaire de carte d'ESP32

![Ouvrir les préférences et trouver la section «Additional boards manager URLs» en bas](./ajouter_m5stack1.SVG)

Voici l'URL à ajouter à l'étape suivante : 
```
https://espressif.github.io/arduino-esp32/package_esp32_index.json
```
![Ajouter l'URL «https://espressif.github.io/arduino-esp32/package_esp32_index.json»](./ajouter_m5stack2.SVG)

![Installer le gestionnaire de carte ESP32](./ajouter_m5stack3.SVG)

### Ajouter la librairie M5Atom

![Trouver la librairie M5Atom](./ajouter_m5atom1.SVG)

![Installer avec toutes les dépendances](./ajouter_m5atom2.SVG)
