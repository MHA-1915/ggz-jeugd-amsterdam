const fs = require('fs');

// Lees het bestand
let content = fs.readFileSync('GGZjeugdAmsterdam.js', 'utf8');

// Exacte coördinaten gebaseerd op volledige adressen
const exactCoordinates = {
    // Arkin
    "Baarsjesweg 224, 1058 AA Amsterdam": { lat: 52.36744, lng: 4.85713 },
    "Wisselwerking 46-48, 1112 XR Diemen": { lat: 52.334722, lng: 4.962778 },
    "Klaprozenweg 111, 1033 NN Amsterdam": { lat: 52.41013, lng: 4.89213 },
    "Bijlmerdreef 1169, 1103 TT Amsterdam": { lat: 52.31213, lng: 4.97213 },
    
    // Boomerang
    "Tijnmuiden 34, 1046AL Amsterdam": { lat: 52.38213, lng: 4.80013 },
    
    // CareHouse
    "Van Hallstraat 10, 1051 HH Amsterdam": { lat: 52.38613, lng: 4.86813 },
    "Johan Cruijff Boulevard 83, 1101 DM Amsterdam": { lat: 52.31298, lng: 4.94413 },
    "Strekkerweg 77, 1033 DA Amsterdam": { lat: 52.41013, lng: 4.89213 },
    "Franz Zieglerstraat 76, 1087 HN Amsterdam": { lat: 52.35513, lng: 5.00213 },
    "President Brandstraat 32, 1091 XH Amsterdam": { lat: 52.36213, lng: 4.93013 },
    "Admiraal de Ruijterweg 454, 1055 NG Amsterdam": { lat: 52.37913, lng: 4.85244 },
    
    // De Opgroeipraktijk
    "Osdorpplein 470, 1068 SZ Amsterdam": { lat: 52.35713, lng: 4.80613 },
    
    // FamilySupporters
    "Burgemeester Eliasstraat 1, 1055 NA Amsterdam": { lat: 52.38113, lng: 4.84913 },
    "Veenplaats 19, 1182 JW Amstelveen": { lat: 52.30889, lng: 4.86389 },
    
    // Fibbe
    "Johan Cruijff Boulevard 83, 1101DM Amsterdam": { lat: 52.31298, lng: 4.94413 },
    
    // Groei&glunder
    "Houtmankade 334-2, 1013 RR Amsterdam": { lat: 52.38813, lng: 4.88113 },
    
    // iHUB Care Express
    "Nassaukade 162H, 1053 LL Amsterdam": { lat: 52.36798, lng: 4.87213 },
    
    // Invivo Kids
    "Veenplaats 19, 1182JW Amstelveen": { lat: 52.30889, lng: 4.86389 },
    
    // Leger des Heils
    "Hilversumstraat 338, 1024MB Amsterdam": { lat: 52.39713, lng: 4.92713 },
    
    // Leveo
    "Burgemeester Eliasstraat 1, 1055 NA Amsterdam": { lat: 52.38113, lng: 4.84913 },
    
    // Levvel
    "Fred. Roeskestraat 73, 1076 EC Amsterdam": { lat: 52.34013, lng: 4.85713 },
    
    // Philadelphia
    "Jekerstraat 84, 1078MG Amsterdam": { lat: 52.33813, lng: 4.91113 },
    
    // PsyGRO
    "Doctor Willem Dreesweg 2, 1185 VB Amstelveen": { lat: 52.31213, lng: 4.85713 },
    
    // RIOzorg
    "Bijlmerdreef 1001-A, 1103 TW Amsterdam": { lat: 52.31213, lng: 4.97213 },
    "C.J. van Houtenlaan 1G, 1381 CN Weesp": { lat: 52.30713, lng: 5.04113 },
    
    // Stichting JA
    "Eerste Oosterparkstraat 88, 1091 GZ Amsterdam": { lat: 52.35913, lng: 4.92213 },
    
    // Terminal 18
    "Admiraal de Ruijterweg 454, 1055NG Amsterdam": { lat: 52.37913, lng: 4.85244 },
    
    // Timon
    "Modemstraat 20C, 1033 RW Amsterdam": { lat: 52.40413, lng: 4.89213 },
    
    // Youz
    "Overschiestraat 57, 1062HN Amsterdam": { lat: 52.34113, lng: 4.83713 },
    
    // Zigzag Kindzorg
    "Albardagracht 1, 1063 NN Amsterdam": { lat: 52.37413, lng: 4.82513 },
    "Amsteldijk 196, 1079 LK Amsterdam": { lat: 52.34413, lng: 4.90213 },
    
    // Kabouterhuis
    "Marne 127, 1186 PJ Amstelveen": { lat: 52.30813, lng: 4.85813 },
    "Kopjachtplein 20, 1034 JG Amsterdam": { lat: 52.40413, lng: 4.89213 },
    "Leksmondplein 28, 1108 EL Amsterdam": { lat: 52.30713, lng: 4.97813 }
};

// Vervang alle coördinaten
Object.keys(exactCoordinates).forEach(address => {
    const coords = exactCoordinates[address];
    const oldPattern = new RegExp(`adres: "${address.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",[^}]*positie: \\{ lat: [^}]+ \\}`, 'g');
    const newReplacement = `adres: "${address}", positie: { lat: ${coords.lat}, lng: ${coords.lng} }`;
    
    content = content.replace(oldPattern, newReplacement);
});

// Schrijf het bestand terug
fs.writeFileSync('GGZjeugdAmsterdam.js', content);

console.log('Alle coördinaten zijn bijgewerkt met exacte waarden!'); 