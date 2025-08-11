# Flappy Bird Kloon Handleiding

In deze handleiding maken we een simpel "Flappy Bird"-achtig spel. De speler bestuurt een vogel die door een reeks pijpen moet vliegen zonder de grond of de pijpen te raken.

## Stap 1: De Vogel Sprite

👉 Verwijder eerst de kat sprite, die hebben we niet nodig.

👉 Maak een nieuwe sprite voor onze held. Laten we die "Vogel" noemen. Je mag zelf een sprite kiezen uit de lijst.

👉 We hebben één variabele nodig voor deze sprite, dus ga naar de categorie "Variabelen" en maak een nieuwe variabele genaamd `y-snelheid`. Zorg ervoor dat deze alleen voor deze sprite is.

### De Vogel Laten Vallen

Om zwaartekracht te simuleren, moet de vogel constant naar beneden vallen. We kunnen dit bereiken door herhaaldelijk zijn y-positie te verlagen.

👉 Voeg de volgende code toe aan de vogel sprite:

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
maak y (0)
maak [y-snelheid v] (0)
herhaal
  verander y met (y-snelheid)
  verander [y-snelheid v] met (-1)
einde
```

### De Vogel Laten Fladderen

Wanneer de speler op een toets drukt, moet de vogel een kleine opwaartse duw krijgen. Dit is de "fladder"-actie. We kunnen dit doen door zijn verticale snelheid op een positief getal in te stellen.

👉 Voeg de volgende code toe aan de vogel sprite:

```scratchblocks:nl
wanneer [spatiebalk v] is ingedrukt
maak [y-snelheid v] (10)
```

## Stap 2: De Achtergrond

👉 Voeg een achtergrond toe die past bij het spel, bijvoorbeeld "Blue Sky"

## Stap 3: De Pijpen

Nu gaan we de obstakels toevoegen. 

👉 Maak een nieuwe sprite met de naam "Pijpen", die je zelf gaat tekenen. 

👉 Het uiterlijk voor deze sprite moet 1 paar pijpen zijn met een opening in het midden waar de vogel doorheen kan vliegen, zoals op dit voorbeeld:

![Voorbeeld van de pijpen](../tubes.png)

### Een Stroom van Pijpen Creëren

We willen dat er elke paar seconden een nieuwe pijp aan de rechterkant van het scherm verschijnt. We kunnen dit doen door klonen van onze "Pijpen"-sprite te maken. Het origineel gaan we verbergen.

👉 Voeg de volgende code toe aan de pijpen sprite (NIET de vogel sprite!):

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
verdwijn
herhaal
  wacht (3) sec.
  maak een kloon van [mijzelf v]
einde
```

### De Pijpen Laten Bewegen

Elke keer dat er een nieuwe kloon wordt gemaakt, moet deze aan de rechterrand van het scherm beginnen en naar links bewegen. We maken de y-positie willekeurig om de hoogte van de opening te variëren. Wanneer de kloon de linkerrand bereikt, moeten we hem verwijderen.

👉 Voeg de volgende code toe aan de pijpen sprite:

```scratchblocks:nl
wanneer ik als kloon start
ga naar x: (240) y: (willekeurig getal tussen (-80) en (80))
verschijn
herhaal tot <(x-positie) < (-240)>
  verander x met (-5)
einde
verwijder deze kloon
```

## Stap 4: Spel Logica

Laten we nu de regels voor winnen en verliezen toevoegen.

### Scoren

👉 Maak een nieuwe variabele voor alle sprites genaamd `score`. 

We verhogen de score telkens wanneer de speler succesvol door een pijp navigeert. Voor de eenvoud voegen we een punt toe nadat een pijp helemaal over het scherm is bewogen. Deze logica hoort in de "Pijpen"-sprite.

👉 Pas het pijp-kloonscript aan om het scoregedeelte toe te voegen. Voeg enkel het nieuwe blokje toe:

```scratchblocks:nl
wanneer ik als kloon start
ga naar x: (240) y: (willekeurig getal tussen (-80) en (80))
verschijn
herhaal tot <(x-positie) < (-240)>
  verander x met (-5)
einde
verander [score v] met (1)
verwijder deze kloon
```

En vergeet niet om de score aan het begin van het spel te resetten. 

👉 Voeg dit ook toe aan de "Pijpen"-sprite:

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
maak [score v] (0)
```

### Botsing en Game Over

Het spel moet eindigen als de vogel een pijp raakt of op de grond valt.

👉 Voeg dit script toe aan de "Vogel"-sprite. Het controleert op een botsing met de pijpen of met de grond:

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
herhaal
  als <<raak ik [Pijpen v]?> of <(y-positie) < (-170)>> dan
    zend signaal [game over v]
  einde
einde
```

Tot slot willen we dat er een "Game Over!" tekst verschijnt. 

👉 Maak een nieuwe sprite met naam "GameOver" die je zelf tekent. Schrijf of typ de tekst in de sprite.

De tekst moet onzichtbaar zijn wanneer het spel begint, en moet verschijnen wanneer het spel gedaan is.

👉 Voeg de volgende stukken code toe aan de game-over sprite:

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
verdwijn

wanneer ik signaal [game over v] ontvang
verschijn
stop [alle v]
```

## Conclusie

En dat is het! Je hebt nu een eenvoudige maar functionele Flappy Bird-kloon. Veel programmeerplezier!
