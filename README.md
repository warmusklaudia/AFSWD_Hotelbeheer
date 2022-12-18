# AFSWD_Eindopdracht

## Paswoorden om te testen

- admin: admin
- user: user

## Geplande werkverdeling in het team

- Admin sectie: Klaudia
- User sectie: Carmino
- Anonieme sectie: Klaudia & Carmino

## Geplande milestones

- [x] Milestone 1 14/10/2022: Design uitgewerkt, User sectie => setup routing, backend entities opzetten

- [x] Milestone 2 14/10/2022: User sectie => screen met overzicht van de kamers | Admin sectie => screen met overzicht van de kamers

- [x] Milestone 3 21/10/2022: User sectie => er kunnen 1 of meerdere kamers gereserveerd worden | Admin sectie => screen die toont welke kamers al gepoetst zijn, overzicht/todo lijst van kamers

- [x] Milestone 4 26/10/2022: User sectie => services kunnen aangevraagd worden | Admin sectie => voeg een kamer toe screen, services overzicht

- [x] Milestone 5 04/11/2022: User sectie => profile page met QR codes voor ontbijt & kamer + i18n, socket.io instellen voor kamers | Admin sectie => screen instellen reservatieprijzen per categorie, overzicht welke gasten toegang hebben tot het ontbijt

- [x] Milestone 6 11/11/2022: User sectie => Hotelcredits toevoegen | Admin sectie => Notificaties maximum kamers bezet

## Seed commando's API

Seeden van rooms
npx nestjs-command seed:database

Seeden van services
npx nestjs-command seed:database:services

Resetten van de database
npx nestjs-command seed:database:reset

## Stappenplan om de applicatie te starten

1. Clone de repository
2. Open de repository in een IDE
3. Open een terminal in de root van de repository
4. Voer het commando "npm ci" uit
5. Plaats een .env file in pwa met firebase config
6. Plaats een .env file & service account van firebase in api
7. Voer de seed commando's uit in de api
8. Voer het commando "npm run dev" uit in de root van de repository

optioneel: maak een gebruiker in graphql aan voor docent@howest.be

## Stappenplan om de applicatie te deployen in Docker

1. Plaats een serviceAccount.json in de api folder
2. In docker-compose.yml, verander de environment variabelen naar de juiste waarden of geef ze mee als argumenten
3. docker-compose up --build

## Extra files te voorzien

plaats in utils hotel-translations.json & token.json voor de i18n

## Checklisten (frontend/backend) met extra uitleg waar nodig.

Opsommen van werktijden: de geschatte werktijden uit de eerste milestone planning plaats je tegenover de werkelijk behaalde planning EN werkelijk
gepresteerde uren (projectboard) TOGGLE.

### Frontend

routing met guards voor admin en user
firebase auth
QR code genereren voor kamer en ontbijt
Admin sectie met overzicht van kamers
User sectie met overzicht van kamers
Dynamische prijs berekening
multistep form
i18n multi language
socket.io
Testen met Cypress
Docker
User foto's opslaan in Firebase Storage
Overzicht van reservations
Popup's voor werklijst cleaning, pricing, reservations
Cache updaten

### Backend

auth met decorators en guards
validation met pipes
seeden van kamers en services met nestjs-command
mocken met **mocks** folder
Testen met Jest
socket.io
Docker

### Gepresteerde uren milestone 1

gezamenlijk: 56:18:54
Carmino: 28:05:14
Klaudia: 28:13:40

### Gepresteerde uren totaal

gezamenlijk: 206:53:48
Carmino: 106:51:33
Klaudia: 101:02:15

## Grootste moeilijkheid (al dan niet opgelost, of omzeild)

Multistep form voor het aanmaken van een reservatie
Applicatie in docker deployen
Custom user correct ophalen bij het inloggen en indien admin - doorsturen naar de juiste page
Cache updaten

## Grootste behaalde succes

Multistep form voor het aanmaken van een reservatie
Typorm met nestjs werkende krijgen
Custom user correct ophalen bij het inloggen en indien admin - doorsturen naar de juiste page
Realtime

## Algemene opmerkingen of suggesties.

Zorgen dat wanneer een gebruiker een reservatie maakt de gebruiker zijn credits afgetrokken worden
implenteren van stripe voor betalingen te doen
meerdere kamers kunnen reserveren in 1 reservering (kleine aanpassing nodig in frontend)
Anonieme gebruiker kan een reservatie maken
Historiek van notifications bij admin
