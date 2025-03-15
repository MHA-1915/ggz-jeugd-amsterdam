# GGZ Jeugd Amsterdam Kaart

Een interactieve kaart die GGZ-zorginstellingen en Ouder- en Kindteams in Amsterdam weergeeft.

## Functionaliteiten

- Interactieve kaart met alle GGZ-zorginstellingen
- Filtering op type zorg en leeftijdscategorie
- Gedetailleerde informatie per instelling
- Responsive design
- Veilige API key handling via backend

## Installatie

1. Clone de repository:
```bash
git clone [repository-url]
cd GGZjeugdAmsterdam
```

2. Installeer de dependencies:
```bash
npm install
```

3. Configureer de environment variables:
```bash
cp .env.example .env
```
Vul je Google Maps API key in in het `.env` bestand.

## Gebruik

1. Start de server:
```bash
node server.js
```

2. Open de website in je browser:
```
http://localhost:3000/kaart.html
```

## Google Maps API Setup

1. Ga naar de [Google Cloud Console](https://console.cloud.google.com)
2. Maak een nieuw project aan of selecteer een bestaand project
3. Enable de Maps JavaScript API
4. Maak een API key aan
5. Stel domeinbeperkingen in voor de API key
6. Voeg de API key toe aan je `.env` bestand

## Veiligheid

- De API key wordt veilig beheerd via environment variables
- API key wordt nooit direct in de frontend code gebruikt
- Gevoelige bestanden (.env, config.js) zijn uitgesloten van versiecontrole
- Backend route voor veilige API key distributie

## Development

Voor development:
1. Server draait op `http://localhost:3000`
2. Gebruik `nodemon` voor automatisch herladen (optioneel):
```bash
npm install -g nodemon
nodemon server.js
```

## Productie

Voor productie deployment:
1. Zorg dat alle gevoelige data in .env staat
2. Controleer de .gitignore voor uitgesloten bestanden
3. Stel de juiste domeinbeperkingen in voor de Google Maps API key
4. Gebruik een beveiligde hosting provider
5. Configureer SSL/TLS voor veilige communicatie

## Licentie

Dit project is beschikbaar onder de MIT-licentie.

## Contact

Voor vragen of suggesties, neem contact op via:
- GitHub Issues: [repository-issues-url] 