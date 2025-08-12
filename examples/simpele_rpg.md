# Eenvoudige RPG Handleiding

In deze handleiding bouwen we de basis voor een RPG (Role-Playing Game). We maken een personage dat met de WASD-toetsen kan bewegen, maar alleen op een vooraf bepaald pad.

## Stap 1: De Held Sprite

👉 Verwijder eerst de kat sprite. Niemand houd van de kat sprite.

👉 Maak een nieuwe sprite voor onze held. Laten we die "Held" noemen. Je mag zelf een sprite kiezen die je leuk vindt.

## Stap 2: De Begaanbare Grond

👉 Kies eerst een achtergrond voor je spel. Kies uit de 'buiten' categorie. Zo lijkt het alsof je held in een echte wereld rondloopt. 

We hebben een manier nodig om te definiëren waar onze held mag lopen. Dit doen we met een aparte sprite die als 'kaart' of 'weg' fungeert.

👉 Maak een nieuwe sprite om zelf te tekenen, en noem deze "Weg".

👉 Teken in het uiterlijk van deze sprite het pad waar de held mag lopen. Een simpele, brede lijn of een gevuld gebied is een goed begin. De kleur maakt niet uit.

👉 Zorg ervoor dat de "Weg"-sprite op de achterste laag staat en onzichtbaar is. We kunnen de sprite niet laten `verdwijnen`, want dan kan de held niet meer voelen of hij de weg raakt. In de plaats gebruiken we het `transparant`-effect.

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
ga [naar achteren v] (99) lagen
zet [transparant v] effect op (100)
```

👉 Tijdens het ontwikkelen is het handig om het `zet [transparant v] effect` blok tijdelijk uit te schakelen door de waarde op 0 te zetten, zodat je het pad kan zien.

## Stap 3: De Beweging van de Held

Nu is het tijd om de held te laten bewegen. We willen dat de speler de WASD-toetsen gebruikt. De held mag alleen bewegen zolang hij de "Weg"-sprite raakt.

👉 Selecteer de "Held" sprite en voeg de volgende code toe:

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
herhaal
  als <toets [w v] ingedrukt?> dan
    verander y met (5)
    als <niet <raak ik [Weg v]?>> dan
      verander y met (-5)
    einde
  einde
  als <toets [s v] ingedrukt?> dan
    verander y met (-5)
    als <niet <raak ik [Weg v]?>> dan
      verander y met (5)
    einde
  einde
  als <toets [a v] ingedrukt?> dan
    verander x met (-5)
    als <niet <raak ik [Weg v]?>> dan
      verander x met (5)
    einde
  einde
  als <toets [d v] ingedrukt?> dan
    verander x met (5)
    als <niet <raak ik [Weg v]?>> dan
      verander x met (-5)
    einde
  einde
einde
```

### Hoe werkt het?

- We starten met de held in het midden van het scherm.
- De `herhaal`-lus controleert continu of een van de WASD-toetsen wordt ingedrukt.
- Als een toets wordt ingedrukt (bijv. 'w'), beweegt de held een klein stukje in die richting.
- **Direct daarna** controleren we of de held de "Weg"-sprite *niet* meer raakt.
- Als dat zo is, betekent het dat de held van het pad af is gestapt. We maken de laatste beweging ongedaan door hem terug te verplaatsen.

## Stap 4: Een Gesprek Voeren

Een RPG is niet compleet zonder personages om mee te praten. Laten we een zeemeermin toevoegen.

👉 Maak een nieuwe sprite en kies de "Mermaid" uit de bibliotheek. Plaats haar ergens op het pad waar de Held haar kan bereiken.

Nu voegen we de logica toe zodat de held met de zeemeermin kan praten. Dit doen we door een signaal uit te zenden wanneer de speler de zeemeermin raakt en op de 'p'-toets drukt.

👉 Voeg de volgende code toe aan de "Held"-sprite. Dit script kan je naast je bewegingscode plaatsen.

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
herhaal
  als <<raak ik [Mermaid v]?> en <toets [p v] ingedrukt?>> dan
    zend signaal [praat met mermaid v]
    wacht tot <niet <toets [p v] ingedrukt?>>
  einde
einde
```
> We voegen `wacht tot <niet <toets [p v] ingedrukt?>>` toe om te voorkomen dat het signaal constant wordt uitgezonden als je de p-toets ingedrukt houdt.

Nu moeten we de sprites laten reageren op het signaal.

👉 Voeg dit blok toe aan de "Held"-sprite:

```scratchblocks:nl
wanneer ik signaal [praat met mermaid v] ontvang
zeg [Hallo Zeemeermin!] (2) sec.
```

👉 En voeg dit blok toe aan de "Mermaid"-sprite:

```scratchblocks:nl
wanneer ik signaal [praat met mermaid v] ontvang
wacht (2) sec.
zeg [Hallo avonturier!] (2) sec.
```
> De `wacht` in het script van de zeemeermin zorgt ervoor dat ze pas antwoordt nadat de held is uitgesproken.

## Stap 5: Meerdere Scènes en Portals

Een groter spel heeft vaak meerdere gebieden of "scènes". We gaan ons spel uitbreiden zodat de held tussen twee scènes kan reizen met portals.

### 1. Scènevariabele en Signaal

👉 Ga naar de categorie "Variabelen" en maak een nieuwe variabele voor alle sprites genaamd `scene`. Hierin slaan we op in welke scène de speler zich bevindt.

👉 We gebruiken nu het Speelveld (rechts van de sprite-lijst) om ons spel te initialiseren. Selecteer het Speelveld en voeg de volgende code toe. Je moet ook een nieuw signaal `wissel scene` maken via het menu in het blok.

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
maak [scene v] [buiten]
zend signaal [wissel scene v]
```

👉 Voeg ook een script toe aan het Speelveld om de achtergrond te wisselen. Zorg ervoor dat je twee achtergronden hebt in de "Achtergronden" tab van de Stage. Noem ze `buiten` en `grot`.

```scratchblocks:nl
wanneer ik signaal [wissel scene v] ontvang
verander achtergrond naar (scene)
```

### 2. Sprites aanpassen aan Scènes

Nu moeten onze sprites reageren op de scène waarin ze zich bevinden. Dit betekent dat we een deel van onze bestaande code moeten aanpassen.

👉 **Weg-sprite:** De `Weg` sprite zal nu paden voor alle scènes bevatten als verschillende "uiterlijken".
-   Ga naar de "Uiterlijken" tab van de `Weg`-sprite.
-   Hernoem het bestaande uiterlijk naar `buiten`.
-   Maak een nieuw uiterlijk, noem het `grot`, en teken een pad voor de tweede scène.
-   Vervang alle code van de `Weg`-sprite door dit ene script. Het verandert het uiterlijk op basis van de scène.

```scratchblocks:nl
wanneer ik signaal [wissel scene v] ontvang
verander uiterlijk naar (scene)
ga [naar achteren v] (99) lagen
zet [transparant v] effect op (100)
```

👉 **Mermaid-sprite:** De zeemeermin bestaat alleen in de `buiten`-scène. Voeg dit script toe:

```scratchblocks:nl
wanneer ik signaal [wissel scene v] ontvang
als <(scene) = [buiten]> dan
    verschijn
anders
    verdwijn
einde
```

👉 **Held-sprite:** Nu voegen we de logica toe die de held op de juiste plek zet bij een scènewissel. Voeg dit nieuwe script toe aan de `Held`.

```scratchblocks:nl
wanneer ik signaal [wissel scene v] ontvang
als <(scene) = [grot]> dan
    ga naar x: (-220) y: (0) // Net aangekomen in de grot, start aan de linkerkant
anders
    ga naar x: (220) y: (0) // Net aangekomen in de buitenwereld, start aan de rechterkant
einde
```

### 3. Portals maken

Om tussen scènes te reizen, gebruiken we twee aparte, onzichtbare portal-sprites. Voor elke richting een.

👉 **Portal 1: Naar de Grot**

Maak een nieuwe sprite, noem hem `Portal naar Grot`. Je kan een simpele vorm tekenen. Plaats deze met je muis aan de rechterrand van het scherm, waar de Held de `buiten`-scène zal verlaten.

Voeg de volgende scripts toe aan `Portal naar Grot`. Het eerste script regelt de zichtbaarheid en maakt de portal doorzichtig. Het tweede script wisselt van scène als de Held de portal raakt.

```scratchblocks:nl
wanneer ik signaal [wissel scene v] ontvang
zet [transparant v] effect op (100)
als <(scene) = [buiten]> dan
    verschijn
anders
    verdwijn
einde
```
```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
herhaal
    als <raak ik [Held v]?> dan
        maak [scene v] [grot]
        zend signaal [wissel scene v]
        wacht (1) sec.
    einde
einde
```

👉 **Portal 2: Naar Buiten**

Maak een tweede sprite, noem hem `Portal naar Buiten`. Plaats deze met je muis aan de linkerrand van het scherm, waar de Held de `grot`-scène zal verlaten.

Voeg deze scripts toe aan de nieuwe sprite. Let op de kleine verschillen!

```scratchblocks:nl
wanneer ik signaal [wissel scene v] ontvang
zet [transparant v] effect op (100)
als <(scene) = [grot]> dan
    verschijn
anders
    verdwijn
einde
```
```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
herhaal
    als <raak ik [Held v]?> dan
        maak [scene v] [buiten]
        zend signaal [wissel scene v]
        wacht (1) sec.
    einde
einde
```

## Stap 6: Conclusie

Geweldig! Je hebt nu een kleine gamewereld met meerdere scènes. Je bestuurbaar personage kan tussen werelden reizen, binnen de grenzen van de paden blijven en zelfs een gesprek voeren. Vanaf hier kun je de wereld uitbreiden met meer scènes, personages en puzzels. Veel plezier!
