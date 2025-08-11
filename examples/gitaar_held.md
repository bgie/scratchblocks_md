# Gitaar Held Handleiding

In deze handleiding bouwen we een muziekspel dat is geïnspireerd op "Guitar Hero". Noten vallen van de bovenkant van het scherm en de speler moet op de juiste toets drukken op het moment dat de noot de onderkant bereikt.

## Stap 1: De Knoppen

Eerst hebben we de knoppen nodig waar de speler op gaat drukken. We maken er vier, voor de toetsen D, F, J en K, die overeenkomen met een correcte vingerpositie bij het typen.

👉 Verwijder de kat sprite. Maak een nieuwe sprite, teken een gekleurde cirkel en noem deze "KnopD".

👉 Dupliceer deze sprite drie keer en noem de kopieën "KnopF", "KnopJ" en "KnopK". Geef elke knop een unieke kleur.

👉 Plaats de vier knoppen netjes naast elkaar aan de onderkant van het speelveld.

Nu voegen we de code toe. Wanneer de speler op 'A' drukt, moet "KnopA" een signaal uitzenden dat de noot geraakt is. We doen dit voor alle vier de knoppen.

👉 Voeg de volgende code toe aan de "KnopD" sprite:

```scratchblocks:nl
wanneer [d v] is ingedrukt
zend signaal [hit1 v]
```

👉 Voeg gelijkaardige code toe aan de andere knoppen:
- **KnopF**: `wanneer [f v] is ingedrukt`, `zend signaal [hit2 v]`
- **KnopJ**: `wanneer [j v] is ingedrukt`, `zend signaal [hit3 v]`
- **KnopK**: `wanneer [k v] is ingedrukt`, `zend signaal [hit4 v]`

## Stap 2: Het Lied en de Noten

De noten die vallen worden klonen van één "Noot" sprite. De volgorde van de noten lezen we uit een lange tekstvariabele.

👉 Maak een nieuwe sprite genaamd "Noot". Teken voor deze sprite vier uiterlijken, elk met dezelfde kleur als een van je knoppen. Zorg dat de volgorde van de kleuren overeenkomt met de knoppen (uiterlijk 1 voor KnopD, uiterlijk 2 voor KnopF, etc.).

👉 Maak twee variabelen voor alle sprites: `liedje` en `index`.
- `liedje` bevat de code voor ons lied. Een cijfer (1-4) stelt een noot voor, en een `-` is een pauze.
- `index` houdt bij waar we in het liedje zijn.

👉 Maak een variabele `type` die enkel voor de "Noot" sprite geldt.

Nu schrijven we de code die het liedje leest en noten creëert. Voeg dit script toe aan de "Noot" sprite. De code verbergt ook de originele noot.

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
verdwijn
maak [liedje v] [1-2-3-4-1-3-2-4-12-34--]
maak [index v] (1)
herhaal (lengte van (liedje))
  maak [type v] (letter (index) van (liedje))
  als <<(type) = (1)> of <<(type) = (2)> of <<(type) = (3)> of <(type) = (4)>>>> dan
    maak een kloon van [mijzelf v]
  einde
  wacht (0.2) sec.
  verander [index v] met (1)
einde
```

## Stap 3: Vallende Noten

Elke keer als er een kloon wordt gemaakt, moet deze bovenaan het scherm verschijnen in de juiste baan en naar beneden vallen.

👉 Voeg de volgende code toe aan de "Noot" sprite:

```scratchblocks:nl
wanneer ik als kloon start
verander uiterlijk naar (type)
als <(type) = (1)> dan
  ga naar x: (-140) y: (200)
einde
als <(type) = (2)> dan
  ga naar x: (-45) y: (200)
einde
als <(type) = (3)> dan
  ga naar x: (45) y: (200)
einde
als <(type) = (4)> dan
  ga naar x: (140) y: (200)
einde
verschijn
herhaal tot <(y-positie) < (-170)>
  verander y met (-5)
einde
verwijder deze kloon
```

## Stap 4: Game Logica: Raken, Scoren en Geluid

Nu het belangrijkste: de speler die de noten probeert te raken en geluid maakt!

👉 **Geluiden toevoegen:** Ga naar de "Noot" sprite en open het "Geluiden" tabblad. Verwijder het standaardgeluid en voeg vier gitaargeluiden toe uit de bibliotheek. Kies bijvoorbeeld "A Elec Guitar", "C Elec Guitar", "E Elec Guitar" en "G Elec Guitar". Hernoem de geluiden naar `1`, `2`, `3` en `4`.

👉 Maak een nieuwe variabele voor alle sprites genaamd `score`. Voeg aan het begin van het spel (bv. in het script van stap 2) een blok toe om de `score` op `0` te zetten.

De "Noot" klonen moeten luisteren naar de signalen van de knoppen. Als het juiste signaal binnenkomt en de noot op de juiste plek is, is het een 'hit'! We spelen dan het juiste geluid en verhogen de score.

👉 Voeg de volgende scripts toe aan de "Noot" sprite:

```scratchblocks:nl
wanneer ik signaal [hit1 v] ontvang
als <<(x-positie) = (-140)> en <(y-positie) < (-90)>> dan
  start geluid [1 v]
  verander [score v] met (10)
  verwijder deze kloon
einde

wanneer ik signaal [hit2 v] ontvang
als <<(x-positie) = (-45)> en <(y-positie) < (-90)>> dan
  start geluid [2 v]
  verander [score v] met (10)
  verwijder deze kloon
einde

wanneer ik signaal [hit3 v] ontvang
als <<(x-positie) = (45)> en <(y-positie) < (-90)>> dan
  start geluid [3 v]
  verander [score v] met (10)
  verwijder deze kloon
einde

wanneer ik signaal [hit4 v] ontvang
als <<(x-positie) = (140)> en <(y-positie) < (-90)>> dan
  start geluid [4 v]
  verander [score v] met (10)
  verwijder deze kloon
einde
```
De `(y-positie) < (-90)` controle zorgt ervoor dat je de noot enkel kan raken als hij in de buurt van de knoppen is.

## Conclusie

Gefeliciteerd! Je hebt een werkend ritmespel gemaakt. Probeer zelf een langer liedje te schrijven in de `liedje` variabele en daag je vrienden uit!
