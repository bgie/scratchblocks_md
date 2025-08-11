# Flappy Bird: Extra Uitdagingen

Gefeliciteerd met het bouwen van je eigen Flappy Bird spel! Nu je de basis hebt, zijn hier enkele ideeën om je spel nog leuker en uitdagender te maken. Probeer ze uit!

## 1. Een Levendigere Vogel

Je vogel vliegt, maar hij kan er nog levendiger uitzien!

### Vleugels flapperen

Nu is de vogel een statische afbeelding. Wat als hij echt met zijn vleugels klappert?
- Heb je een sprite met meerdere "uiterlijken"? Hoe kan je wisselen tussen uiterlijken om een animatie te maken?
- Welk blok kan je gebruiken om naar het `volgend uiterlijk` te gaan?
- Wanneer moeten de vleugels flapperen? Alleen als je op de spatiebalk drukt, of de hele tijd?

### Neerwaartse duik

Als de vogel valt, kijkt hij nog steeds recht vooruit. Het zou cooler zijn als hij naar beneden kijkt tijdens het vallen en omhoog wanneer hij fladdert.
- Welk blok kan de richting van een sprite veranderen? Denk aan `richt naar ... graden`.
- Hoe weet je of de vogel stijgt of daalt? Welke variabele houdt de verticale snelheid bij?
- Kan je een `als ... dan` blok gebruiken om de richting te veranderen op basis van `y-snelheid`?

## 2. Geluidseffecten

Geluiden maken een spel veel meeslepender.

- Kan je een geluid vinden voor het fladderen? Welk blok gebruik je om een `geluid te starten`? Waar in je code zou je dat blok moeten plaatsen?
- Wat voor geluid zou er moeten spelen als je een punt scoort? En als het spel voorbij is?
- Scratch heeft een bibliotheek met geluiden. Je kan ook zelf geluiden opnemen!

## 3. Een High-Score Systeem

Het is leuk om je score te zien, maar wat is je allerbeste score?

- Je hebt al een `score` variabele. Hoe kan je een nieuwe variabele maken voor de `highscore`?
- Wanneer moet je de `highscore` updaten? Alleen als de huidige `score` hoger is dan de `highscore`.
- Hoe controleer je of de ene variabele groter is dan de andere?
- **Uitdaging**: de `highscore` wordt gereset telkens als je het spel start. Hoe kan je ervoor zorgen dat de `highscore` bewaard blijft, zelfs nadat je het spel hebt afgesloten? (Hint: kijk eens naar "Cloud variabelen" als je online bent).

## 4. Bewegende Pijpen

De pijpen komen nu op willekeurige hoogtes, maar wat als ze ook op en neer bewegen om het moeilijker te maken?

- In welk script worden de pijpklonen gemaakt en bewogen?
- Hoe kan je de y-positie van de pijpen veranderen terwijl ze naar links bewegen?
- Misschien kan je een nieuwe variabele `verticale-snelheid-pijp` maken voor elke kloon? Of ze laten `schuiven`?

## 5. Een Startknop

Professionele spellen beginnen niet zomaar. Ze hebben vaak een startscherm.

- Kan je een nieuwe sprite maken die eruitziet als een "Start" knop?
- Hoe kan je alle actie pauzeren totdat de speler op de startknop klikt?
- Misschien kan je een `wanneer op deze sprite wordt geklikt` blok gebruiken. Welk signaal zou het moeten `zenden` om het spel te starten?
- Welke sprites moeten luisteren naar dit "start" signaal?

## 6. Een Theatrale Val

Nu stopt het spel onmiddellijk wanneer je verliest. Het is dramatischer als de vogel uit de lucht valt en de wereld om hem heen bevriest.

- **De val**: Verwijder het `stop [alle v]` blok uit de "GameOver" sprite. Voeg in plaats daarvan een nieuw script toe aan de "Vogel" sprite dat start `wanneer ik signaal [game over v] ontvang`. In dit script moet je de vogel naar beneden laten vallen en tegelijkertijd laten ronddraaien. Een `herhaal` blok kan hier handig zijn.
- **Controle uitschakelen**: Hoe zorg je ervoor dat de speler niet meer kan fladderen na "game over"? Je moet de code die reageert op de spatiebalk stoppen. Het `stop [andere scripts in sprite v]` blok kan hierbij helpen. Waar zou je dit blok plaatsen?
- **Pijpen bevriezen**: De pijpen moeten ook stoppen met bewegen en er mogen geen nieuwe pijpen meer bijkomen. Ook hier kan je het "game over" signaal gebruiken om de scripts in de "Pijpen" sprite te stoppen.
