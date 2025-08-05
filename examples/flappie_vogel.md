# Flappie Vogel Kloon Handleiding

In deze handleiding maken we een simpel "Flappie Vogel"-achtig spel. De speler bestuurt een vogel die door een reeks pijpen moet vliegen zonder de grond of de pijpen te raken.

## Stap 1: De Vogel Sprite

Maak eerst een nieuwe sprite voor onze held. Laten we hem "Vogel" noemen. We hebben één variabele nodig voor deze sprite, dus ga naar de categorie "Variabelen" en maak een nieuwe variabele genaamd `y-snelheid`. Zorg ervoor dat deze alleen voor deze sprite is.

### De Vogel Laten Vallen

Om zwaartekracht te simuleren, moet de vogel constant naar beneden vallen. We kunnen dit bereiken door herhaaldelijk zijn y-positie te verlagen.

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

```scratchblocks:nl
wanneer [spatiebalk v] is ingedrukt
maak [y-snelheid v] (10)
```

## Stap 2: De Pijpen

Nu de obstakels. Maak een nieuwe sprite met de naam "Pijpen". Het uiterlijk voor deze sprite moet een paar pijpen zijn met een opening in het midden waar de vogel doorheen kan vliegen.

### Een Stroom van Pijpen Creëren

We willen dat er elke paar seconden een nieuwe pijp aan de rechterkant van het scherm verschijnt. We kunnen dit doen door klonen van onze "Pijpen"-sprite te maken.

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

```scratchblocks:nl
wanneer ik als kloon start
ga naar x: (240) y: (willekeurig getal tussen (-80) en (80))
verschijn
herhaal tot <(x-positie) < (-240)>
  verander x met (-5)
einde
verwijder deze kloon
```

## Stap 3: Spel Logica

Laten we nu de regels voor winnen en verliezen toevoegen.

### Scoren

Maak een nieuwe variabele voor alle sprites genaamd `score`. We verhogen de score telkens wanneer de speler succesvol door een pijp navigeert. Voor de eenvoud voegen we een punt toe nadat een pijp helemaal over het scherm is bewogen. Deze logica hoort in de "Pijpen"-sprite.

Pas het pijp-kloonscript aan om het scoregedeelte toe te voegen:
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

En vergeet niet om de score aan het begin van het spel te resetten. Voeg dit ook toe aan de "Pijpen"-sprite:
```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
maak [score v] (0)
```

### Botsing en Game Over

Het spel moet eindigen als de vogel een pijp raakt of op de grond valt. Voeg dit script toe aan de "Vogel"-sprite. Het controleert op een botsing en zendt een "game over"-signaal uit.

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
herhaal
  als <<raak ik [Pijpen v]?> of <(y-positie) < (-170)>> dan
    zend signaal [game over v]
  einde
einde
```

Tot slot moeten we alle sprites vertellen wat ze moeten doen als ze het "game over"-signaal ontvangen. Het gebruik van `stop alles` is de gemakkelijkste manier om het spel te beëindigen. Voeg dit script toe aan de "Vogel"-sprite.

```scratchblocks:nl
wanneer ik signaal [game over v] ontvang
zeg [Game Over!]
stop [alles v]
```

## Conclusie

En dat is het! Je hebt nu een eenvoudige maar functionele Flappie Vogel-kloon. Je kunt dit uitbreiden door geluiden, interessantere graphics of een startscherm toe te voegen. Veel programmeerplezier!
