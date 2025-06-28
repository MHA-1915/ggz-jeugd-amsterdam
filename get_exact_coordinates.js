const https = require('https');

// OKT adressen die we willen geocoderen
const oktAddresses = [
    "Burgemeester Eliasstraat 1, 1055 NA Amsterdam",
    "Bijlmerdreef 1001-A, 1103 TW Amsterdam",
    "Baarsjesweg 224, 1058 AA Amsterdam",
    "Eerste Oosterparkstraat 88, 1091 GZ Amsterdam",
    "Hilversumstraat 338, 1024MB Amsterdam",
    "Johan Cruijff Boulevard 83, 1101DM Amsterdam",
    "Modemstraat 20C, 1033 RW Amsterdam",
    "Admiraal de Ruijterweg 454, 1055NG Amsterdam",
    "Houtmankade 334-2, 1013 RR Amsterdam",
    "Van Hallstraat 10, 1051HH Amsterdam",
    "Overschiestraat 57, 1062HN Amsterdam",
    "Veenplaats 19, 1182JW Amstelveen",
    "Doctor Willem Dreesweg 2, 1185 VB Amstelveen"
];

// Functie om coördinaten op te zoeken via Nominatim (OpenStreetMap)
function getCoordinates(address) {
    return new Promise((resolve, reject) => {
        const encodedAddress = encodeURIComponent(address);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;
        
        https.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const results = JSON.parse(data);
                    if (results.length > 0) {
                        resolve({
                            address: address,
                            lat: parseFloat(results[0].lat),
                            lng: parseFloat(results[0].lon)
                        });
                    } else {
                        console.log(`Geen resultaten gevonden voor: ${address}`);
                        resolve(null);
                    }
                } catch (error) {
                    console.error(`Fout bij verwerken van ${address}:`, error);
                    resolve(null);
                }
            });
        }).on('error', (error) => {
            console.error(`Fout bij ophalen van ${address}:`, error);
            resolve(null);
        });
    });
}

// Alle coördinaten ophalen
async function getAllCoordinates() {
    console.log('Coördinaten ophalen voor OKT adressen...\n');
    
    const results = [];
    
    for (const address of oktAddresses) {
        console.log(`Zoeken naar: ${address}`);
        const result = await getCoordinates(address);
        if (result) {
            results.push(result);
            console.log(`✓ ${result.lat}, ${result.lng}\n`);
        }
        
        // Wacht even tussen requests om de server niet te overbelasten
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n=== RESULTATEN ===');
    console.log('const oktCoordinates = {');
    results.forEach(result => {
        console.log(`    "${result.address}": { lat: ${result.lat}, lng: ${result.lng} },`);
    });
    console.log('};');
}

getAllCoordinates(); 