# Book App

## Om projektet
Det här är en bokapp jag byggt i React där man kan söka efter böcker, se mer info och skriva recensioner. Målet var att få bättre förståelse för hur React funkar i praktiken, med state, komponenter och API-anrop.

## Hur appen funkar
När man kommer in i appen ser man direkt en sökfunktion. När man skriver något hämtas böcker från ett API och visas i en lista. Man kan klicka på en bok och då öppnas en popup med mer information och recensioner. Det går även att skriva en recension, men bara om man är inloggad. Efter inloggning kan användaren också gå till en sida där man ser sina egna recensioner.

## Hur jag byggde lösningen
Jag har delat upp appen i flera komponenter, till exempel för sökfält, lista, popup, login och recensioner. Det gjorde koden mer strukturerad och lättare att jobba med.

Jag har använt `useState` och `useEffect` för att hantera state och hämta data.

När man söker:
- text sparas i state  
- API-anrop görs  
- resultat sparas i state  
- UI uppdateras automatiskt  

Samma sak händer när man lägger till en recension.

## Login och recensioner
Man måste vara inloggad för att skriva recensioner. Efter login kan man skriva recensioner och se sina egna på en separat sida.

## Av Haris
