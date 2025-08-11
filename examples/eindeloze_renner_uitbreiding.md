# Eindeloze Renner: Uitbreidingen

Heb je de basisversie van het spel af? Probeer nu deze uitdagingen om je spel nog leuker en unieker te maken! De uitdagingen gaan van makkelijk naar moeilijk. We geven geen kant-en-klare code, maar stellen vragen om je op weg te helpen.

## 1. Een Rennende Held

Je "Speler" staat nu stil, zelfs als hij beweegt. Laten we hem een ren-animatie geven.

- De meeste sprites hebben meerdere "uiterlijken". Hoe kan je je speler eruit laten zien alsof hij rent door van uiterlijk te wisselen?
- Welk blok heb je nodig om constant van uiterlijk te wisselen?
- Waar in je code moet deze animatie-lus komen? Moet hij altijd draaien, of alleen als de speler op de grond is?

## 2. Versnelling!

Eindeloze renners worden moeilijker naarmate je langer speelt. Een manier om dit te doen, is door de hindernissen sneller te laten bewegen.

- Hoe kun je de snelheid van de hindernissen geleidelijk verhogen?
- Heb je een nieuwe variabele nodig om de snelheid bij te houden, of kun je een bestaande variabele zoals `score` gebruiken?
- Op welke plek in de code van de "Hindernis" wordt de snelheid bepaald? Hoe pas je die aan zodat de snelheid toeneemt?

## 3. Bukken voor Gevaar

Niet alle hindernissen zijn hetzelfde. Wat als er ook hoge obstakels zijn waar je onderdoor moet glijden?

- Hoe kan de "Hindernis"-sprite verschillende uiterlijken hebben (bijvoorbeeld een laag blokje en een hoge paal)?
- Hoe kan een kloon willekeurig een van deze uiterlijken kiezen wanneer hij start?
- Heeft de speler een nieuwe actie nodig, zoals "bukken"? Welke toets zou je daarvoor gebruiken?
- Hoe zou de "bukken"-actie eruitzien? Verandert de grootte van de sprite, of wisselt hij naar een ander uiterlijk?
- Hoe controleer je of de speler een hoge hindernis raakt terwijl hij niet bukt?

## 4. Een Startknop

Professionele spellen beginnen niet zomaar. Ze hebben een startscherm of een startknop.

- Hoe kun je voorkomen dat het spel onmiddellijk begint als de groene vlag wordt aangeklikt?
- Je zou een nieuwe sprite kunnen maken die als "Start"-knop dient. Wat moet er gebeuren als je op die sprite klikt?
- Misschien kan je een `wanneer op deze sprite wordt geklikt` blok gebruiken. Welk signaal zou het moeten `zenden` om het spel te starten?
- Welke sprites moeten luisteren naar dit "start" signaal?
