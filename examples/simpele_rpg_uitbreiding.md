# Eenvoudige RPG (Uitbreiding): Een Queeste Toevoegen

In de vorige handleiding hebben we een basis RPG gebouwd. Nu gaan we een stap verder en voegen we een 'queeste' toe. Een queeste is een taak of missie die de speler moet voltooien. Onze queeste: vind een vis en breng hem naar de zeemeermin voor een beloning!

## Stap 1: Voorbereiding

We gaan verder met het project van de "Eenvoudige RPG" handleiding. Zorg ervoor dat je dat project geopend hebt.

We hebben een manier nodig om bij te houden welke items de speler heeft. Dit doen we met variabelen.

👉 Maak twee nieuwe variabelen voor alle sprites:
- `heeft vis`
- `heeft schelp`

👉 We moeten ervoor zorgen dat de speler de queeste opnieuw kan starten. Voeg in het **Speelveld** script deze initialisatie toe aan het `wanneer groene vlag wordt aangeklikt` blok:

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
maak [scene v] [buiten]
maak [heeft vis v] [nee]
maak [heeft schelp v] [nee]
zend signaal [wissel scene v]
```

## Stap 2: Het Queeste-item (de Vis)

Eerst moeten we het item dat de speler moet vinden in de wereld plaatsen.

👉 Maak een nieuwe sprite. Kies de "Fish" uit de bibliotheek. We noemen hem "Vis".

👉 Plaats de "Vis" ergens in de `grot`-scène.

👉 De vis moet alleen zichtbaar zijn in de grot en alleen als de speler hem nog niet heeft. Voeg dit script toe aan de "Vis"-sprite:

```scratchblocks:nl
wanneer ik signaal [wissel scene v] ontvang
als <<(scene) = [grot]> en <(heeft vis) = [nee]>> dan
    verschijn
anders
    verdwijn
einde
```

## Stap 3: De Vis Oppakken

Nu moet de held de vis kunnen oppakken. In plaats van de "Held" te laten controleren of hij een vis aanraakt, laten we de "Vis" zelf controleren of de Held hem aanraakt. Hierdoor hebben we geen extra signaal nodig.

👉 Selecteer de "Vis" sprite en voeg het volgende script toe. Dit script handelt het oppakken af.

```scratchblocks:nl
wanneer groene vlag wordt aangeklikt
herhaal
  als <<(heeft vis) = [nee]> en <<raak ik [Held v]?> en <toets [o v] ingedrukt?>>> dan
    maak [heeft vis v] [ja]
    verdwijn
  einde
einde
```
> We gebruiken 'o' voor 'oppakken'. Dit script controleert continu drie dingen: of de speler de vis nog niet heeft, of de "Held" de "Vis" aanraakt, en of de 'o'-toets is ingedrukt. Als aan alle voorwaarden is voldaan, wordt de variabele `heeft vis` op `ja` gezet en verdwijnt de vis. Er is geen code nodig op de "Held"-sprite voor deze actie.

## Stap 4: Een Nieuw Gesprek met de Zeemeermin

Nu passen we het gesprek aan. Als de held de vis heeft, zal de zeemeermin anders reageren.

👉 Ga naar de "Held"-sprite. Zoek je bestaande `wanneer ik signaal [praat met mermaid v] ontvang` blok en **vervang het** met dit nieuwe, slimmere blok:

```scratchblocks:nl
wanneer ik signaal [praat met mermaid v] ontvang
als <(heeft vis) = [ja]> dan
    zeg [Ik heb een vis voor je!] (2) sec.
anders
    zeg [Hallo Zeemeermin!] (2) sec.
einde
```

👉 Doe nu hetzelfde voor de "Mermaid"-sprite. Zij moet ook anders reageren en ons een beloning geven. **Vervang** haar `wanneer ik signaal [praat met mermaid v] ontvang` blok met dit script:

```scratchblocks:nl
wanneer ik signaal [praat met mermaid v] ontvang
wacht (2) sec.
als <(heeft vis) = [ja]> dan
    zeg [Oh, wat een prachtige vis! Dank je wel!] (2) sec.
    wacht (2) sec.
    zeg [Hier, neem deze magische schelp als bedankje.] (2) sec.
    maak [heeft vis v] [nee]
    maak [heeft schelp v] [ja]
anders
    zeg [Hallo avonturier!] (2) sec.
einde
```

## Stap 5: De Queeste Voltooid!

Geweldig! Je hebt de queeste voltooid. Als je nu weer met de zeemeermin praat, zal ze haar normale begroeting geven omdat je de vis niet meer hebt.

### Wat nu?

Je kunt deze logica gebruiken om nog complexere queesten te bouwen. Misschien moet je de schelp ergens anders gebruiken om een nieuwe deur te openen?

## Uitdaging: Een tweede gesprek

Pas de code aan zodat de zeemeermin je herkent als je met de schelp terugkomt.
- Als je de schelp hebt en met haar praat, moet ze zeggen: "Hopelijk brengt die schelp je geluk!".
- Zorg ervoor dat de andere gesprekken (met vis, en zonder iets) nog steeds correct werken.

Hint: je hebt een `als/dan/anders` blok *binnen* een ander `als/dan/anders` blok nodig in het script van de zeemeermin.
