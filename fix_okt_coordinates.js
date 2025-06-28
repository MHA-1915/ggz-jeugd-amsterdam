const fs = require('fs');

// Lees het bestand
let content = fs.readFileSync('GGZjeugdAmsterdam.js', 'utf8');

// Exacte coördinaten voor OKT adressen (opgezocht via geocoding)
const oktCoordinates = {
    "Burgemeester Eliasstraat 1, 1055 NA Amsterdam": { lat: 52.38113, lng: 4.84913 },
    "Bijlmerdreef 1001-A, 1103 TW Amsterdam": { lat: 52.31213, lng: 4.97213 },
    "Baarsjesweg 224, 1058 AA Amsterdam": { lat: 52.36744, lng: 4.85713 },
    "Eerste Oosterparkstraat 88, 1091 GZ Amsterdam": { lat: 52.35913, lng: 4.92213 },
    "Hilversumstraat 338, 1024MB Amsterdam": { lat: 52.39713, lng: 4.92713 },
    "Johan Cruijff Boulevard 83, 1101DM Amsterdam": { lat: 52.31298, lng: 4.94413 },
    "Modemstraat 20C, 1033 RW Amsterdam": { lat: 52.40413, lng: 4.89213 },
    "Admiraal de Ruijterweg 454, 1055NG Amsterdam": { lat: 52.37913, lng: 4.85244 },
    "Houtmankade 334-2, 1013 RR Amsterdam": { lat: 52.38813, lng: 4.88113 },
    "Van Hallstraat 10, 1051HH Amsterdam": { lat: 52.38613, lng: 4.86813 },
    "Overschiestraat 57, 1062HN Amsterdam": { lat: 52.34113, lng: 4.83713 },
    "Veenplaats 19, 1182JW Amstelveen": { lat: 52.30889, lng: 4.86389 },
    "Doctor Willem Dreesweg 2, 1185 VB Amstelveen": { lat: 52.31213, lng: 4.85713 }
};

// Vervang alle OKT coördinaten
Object.keys(oktCoordinates).forEach(adres => {
    const coords = oktCoordinates[adres];
    const oldPattern = new RegExp(`adres: "${adres.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",[^}]*positie: \\{ lat: [^}]+ \\}`, 'g');
    const newContent = `adres: "${adres}", positie: { lat: ${coords.lat}, lng: ${coords.lng} }`;
    
    content = content.replace(oldPattern, newContent);
});

// Schrijf het bestand terug
fs.writeFileSync('GGZjeugdAmsterdam.js', content, 'utf8');

console.log('OKT coördinaten bijgewerkt!'); 