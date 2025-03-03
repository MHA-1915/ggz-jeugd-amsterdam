# GGZ Jeugd Amsterdam Kaart

Een interactieve kaart die GGZ-zorginstellingen en Ouder- en Kindteams in Amsterdam weergeeft.

## Functionaliteiten

- Interactieve kaart met alle GGZ-zorginstellingen
- Filtering op type zorg en leeftijdscategorie
- Gedetailleerde informatie per instelling
- Responsive design

## Installatie

1. Clone de repository:
```bash
git clone [repository-url]
cd GGZjeugdAmsterdam
```

2. Installeer de backend dependencies:
```bash
cd server
npm install
```

3. Configureer de environment variables:
```bash
cp .env.example .env
```
Vul je Google Maps API key in in het `.env` bestand.

## Gebruik

1. Start de backend server:
```bash
cd server
npm run dev
```

2. Start de frontend server (in een nieuwe terminal):
```bash
cd ..
python3 -m http.server 8080
```

3. Open de website in je browser:
```
http://localhost:8080/kaart.html
```

## Google Maps API Setup

1. Ga naar de [Google Cloud Console](https://console.cloud.google.com)
2. Maak een nieuw project aan of selecteer een bestaand project
3. Enable de Maps JavaScript API
4. Maak een API key aan
5. Stel domeinbeperkingen in voor de API key
6. Voeg de API key toe aan je `.env` bestand

## Veiligheid

- De API key wordt veilig beheerd via de backend
- CORS is geconfigureerd voor lokale development
- Gevoelige informatie is uitgesloten van versiecontrole

## Development

Voor development:
1. Backend draait op `http://localhost:3000`
2. Frontend is beschikbaar op `http://localhost:8080`
3. Gebruik `nodemon` voor automatisch herladen van de backend

## Productie

Voor productie deployment:
1. Pas de CORS origins aan in `server.js`
2. Stel de juiste domeinbeperkingen in voor de Google Maps API key
3. Gebruik een beveiligde hosting provider voor de backend
4. Configureer SSL/TLS voor veilige communicatie

## Lokaal Ontwikkelen

1. Clone de repository
2. Open een terminal in de projectmap
3. Start een lokale server (bijvoorbeeld `python3 -m http.server`)
4. Open `http://localhost:8000` in je browser

## Licentie

Dit project is beschikbaar onder de MIT-licentie.

## Contact

Voor vragen of suggesties, neem contact op via:
- Email: info@zorgkaartamsterdam.nl
- GitHub Issues: https://github.com/mha-1915/ggz-jeugd-amsterdam/issues 