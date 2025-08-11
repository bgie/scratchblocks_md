# Eindeloze Renner Handleiding

In deze handleiding maken we een "Eindeloze Renner" spel. De speler bestuurt een personage dat over aankomende hindernissen moet springen.

## Stap 1: De Speler Sprite

👉 Verwijder eerst de kat sprite, die hebben we niet nodig.

👉 Maak een nieuwe sprite voor onze held. Laten we die "Speler" noemen. Je mag zelf een sprite kiezen uit de lijst, bijvoorbeeld een dier of een persoon.

👉 We hebben een variabele nodig om de sprong te beheren. Ga naar de categorie "Variabelen" en maak een nieuwe variabele genaamd `y-snelheid`. Zorg ervoor dat deze alleen voor deze sprite is.

### Zwaartekracht Simuleren

De speler moet op de grond beginnen en na een sprong weer naar beneden vallen. Dit doen we met een zwaartekracht-script.

👉 Voeg de volgende code toe aan de "Speler" sprite. We zorgen ervoor dat de speler altijd naar beneden valt tenzij hij op de grond staat. De grond is bij ons op y-positie -120.

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
ga naar x: (-180) y: (-120)
maak [y-snelheid v] (0)
herhaal
  verander y met (y-snelheid)
  als <(y-positie) > (-120)> dan
    verander [y-snelheid v] met (-2)
  anders
    maak y (-120)
  einde
einde
```

### Laten Springen

Wanneer de speler op de spatiebalk drukt, moet het personage omhoog springen. We geven hem een opwaartse snelheid, en de zwaartekracht doet de rest. We controleren of de speler op de grond staat, zodat hij niet in de lucht kan blijven springen.

👉 Voeg deze code toe aan de "Speler" sprite:

```scratchblocks:nl
wanneer [spatiebalk v] is ingedrukt
als <(y-positie) = (-120)> dan
  maak [y-snelheid v] (22)
einde
```

## Stap 2: De Hindernissen

Nu voegen we de obstakels toe waar de speler overheen moet springen.

👉 Maak een nieuwe sprite met de naam "Hindernis". Je kunt zelf iets tekenen of een sprite kiezen die als obstakel kan dienen. Zorg ervoor dat hij niet te groot is.

### Een Stroom van Hindernissen Creëren

We willen dat er continu hindernissen van rechts naar links over het scherm bewegen. We gebruiken klonen om dit te bereiken. De originele "Hindernis" sprite verbergen we.

👉 Voeg de volgende code toe aan de "Hindernis" sprite:

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
verdwijn
herhaal
  wacht (willekeurig getal tussen (1.5) en (3)) sec.
  maak een kloon van [mijzelf v]
einde
```

### De Hindernissen Laten Bewegen

Elke nieuwe kloon moet aan de rechterkant van het scherm beginnen en naar links bewegen. Wanneer de kloon de linkerrand bereikt, wordt hij verwijderd.

👉 Voeg de volgende code toe aan de "Hindernis" sprite:

```scratchblocks:nl
wanneer ik als kloon start
ga naar x: (240) y: (-120)
verschijn
herhaal tot <(x-positie) < (-240)>
  verander x met (-8)
einde
verwijder deze kloon
```

## Stap 3: Spel Logica

Nu de basis werkt, voegen we de spelregels toe.

### Scoren

👉 Maak een nieuwe variabele voor alle sprites genaamd `score`.

We verhogen de score telkens wanneer de speler succesvol over een hindernis springt. Dit doen we door de score te verhogen net voordat een hinderniskloon wordt verwijderd.

👉 Pas het hindernis-kloonscript aan. Voeg enkel het nieuwe blokje toe:

```scratchblocks:nl
wanneer ik als kloon start
ga naar x: (240) y: (-120)
verschijn
herhaal tot <(x-positie) < (-240)>
  verander x met (-8)
einde
verander [score v] met (1)
verwijder deze kloon
```

Vergeet niet de score te resetten aan het begin van het spel.

👉 Voeg dit ook toe aan de "Hindernis"-sprite:

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
maak [score v] (0)
```

### Game Over

Het spel eindigt als de speler een hindernis raakt.

👉 Voeg dit script toe aan de "Speler"-sprite. Het controleert continu op een botsing.

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
herhaal
  als <raak ik [Hindernis v]?> dan
    zend signaal [game over v]
  einde
einde
```

Nu moeten we nog laten zien dat het spel voorbij is.

👉 Maak een nieuwe sprite met de naam "GameOver". Teken of schrijf "Game Over!" in het uiterlijk van deze sprite.

Deze tekst moet onzichtbaar zijn bij de start en verschijnen als het spel eindigt.

👉 Voeg de volgende code toe aan de "GameOver"-sprite:

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
verdwijn

wanneer ik signaal [game over v] ontvang
verschijn
stop [alle v]
```

## Conclusie

Dat is alles! Je hebt nu een werkend eindeloze-renner-spel gemaakt. Probeer het uit en kijk hoe hoog je kunt scoren!
