const fs = require("fs");

// Lees het bestand
let content = fs.readFileSync("GGZjeugdAmsterdam.js", "utf8");

// Vervang alle coördinaten met de juiste waarden
const coordinateReplacements = [
    // Arkin
    { old: 'lat: 52.370216, lng: 4.873425', new: 'lat: 52.36744, lng: 4.85713' },
    
    // Boomerang
    { old: 'lat: 52.378889, lng: 4.856667', new: 'lat: 52.38213, lng: 4.80013' },
    
    // CareHouse
    { old: 'lat: 52.370216, lng: 4.873425', new: 'lat: 52.38613, lng: 4.86813' },
    
    // De Opgroeipraktijk
    { old: 'lat: 52.395833, lng: 4.933889', new: 'lat: 52.41013, lng: 4.89213' },
    
    // FamilySupporters
    { old: 'lat: 52.352778, lng: 4.858889', new: 'lat: 52.38113, lng: 4.84913' },
    
    // Fibbe
    { old: 'lat: 52.355556, lng: 4.785556', new: 'lat: 52.31298, lng: 4.94413' },
    
    // Groei&glunder
    { old: 'lat: 52.378889, lng: 4.898889', new: 'lat: 52.38813, lng: 4.88113' },
    
    // iHUB Care Express
    { old: 'lat: 52.372778, lng: 4.881667', new: 'lat: 52.36798, lng: 4.87213' },
    
    // iHUB Familiezorg
    { old: 'lat: 52.395833, lng: 4.933889', new: 'lat: 52.41013, lng: 4.89213' },
    
    // Invivo Kids
    { old: 'lat: 52.308889, lng: 4.863889', new: 'lat: 52.30889, lng: 4.86389' },
    
    // Leger des Heils
    { old: 'lat: 52.402778, lng: 4.915556', new: 'lat: 52.39713, lng: 4.92713' },
    
    // Leveo
    { old: 'lat: 52.352778, lng: 4.858889', new: 'lat: 52.38113, lng: 4.84913' },
    
    // Levvel
    { old: 'lat: 52.345556, lng: 4.872222', new: 'lat: 52.34013, lng: 4.85713' },
    
    // Philadelphia
    { old: 'lat: 52.357778, lng: 4.927778', new: 'lat: 52.33813, lng: 4.91113' },
    
    // PsyGRO
    { old: 'lat: 52.308889, lng: 4.863889', new: 'lat: 52.31213, lng: 4.85713' },
    
    // RIOzorg
    { old: 'lat: 52.313889, lng: 4.948889', new: 'lat: 52.31213, lng: 4.97213' },
    
    // Stichting JA
    { old: 'lat: 52.357778, lng: 4.927778', new: 'lat: 52.35913, lng: 4.92213' },
    
    // Terminal 18
    { old: 'lat: 52.352778, lng: 4.858889', new: 'lat: 52.37913, lng: 4.85244' },
    
    // Timon
    { old: 'lat: 52.395833, lng: 4.933889', new: 'lat: 52.40413, lng: 4.89213' },
    
    // Youz
    { old: 'lat: 52.365556, lng: 4.871667', new: 'lat: 52.34113, lng: 4.83713' },
    
    // Zigzag Kindzorg
    { old: 'lat: 52.378889, lng: 4.856667', new: 'lat: 52.37413, lng: 4.82513' },
    { old: 'lat: 52.352778, lng: 4.858889', new: 'lat: 52.34413, lng: 4.90213' },
    
    // Kabouterhuis
    { old: 'lat: 52.308889, lng: 4.863889', new: 'lat: 52.30813, lng: 4.85813' },
    { old: 'lat: 52.352778, lng: 4.858889', new: 'lat: 52.34413, lng: 4.90213' },
    { old: 'lat: 52.395833, lng: 4.933889', new: 'lat: 52.40413, lng: 4.89213' },
    { old: 'lat: 52.378889, lng: 4.856667', new: 'lat: 52.37413, lng: 4.82513' },
    { old: 'lat: 52.385833, lng: 4.895833', new: 'lat: 52.30713, lng: 4.97813' }
];

// Voer alle vervangingen uit
coordinateReplacements.forEach(replacement => {
    content = content.replace(new RegExp(replacement.old, 'g'), replacement.new);
});

// Schrijf het bestand terug
fs.writeFileSync("GGZjeugdAmsterdam.js", content);

console.log("Alle coördinaten zijn bijgewerkt!");
