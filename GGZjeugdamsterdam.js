// Globale variabelen
let map;
let markers = [];

// Voorbeeld zorginstelling data (in een echt scenario zou dit van een API of database komen)
const zorginstellingen = [
    {
        naam: "GGZ Centrum Amsterdam-Zuid",
        type: "basis",
        positie: { lat: 52.3507849, lng: 4.8488727 },
        adres: "Amstelveenseweg 589, 1081 JC Amsterdam"
    },
    {
        naam: "Jeugd GGZ Noord",
        type: "gespecialiseerd",
        positie: { lat: 52.3907849, lng: 4.9188727 },
        adres: "Meibergdreef 5, 1105 AZ Amsterdam"
    }
];

// Initialiseer de kaart
function initMap() {
    // Centreer de kaart op Amsterdam
    const amsterdam = { lat: 52.3676, lng: 4.9041 };
    
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: amsterdam,
        styles: [
            {
                featureType: "poi.business",
                stylers: [{ visibility: "off" }]
            }
        ]
    });

    // Plaats markers voor alle zorginstellingen
    toonZorginstellingen(zorginstellingen);

    // Voeg event listener toe aan het zoekformulier
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        zoekZorginstellingen();
    });
}

// Functie om zorginstellingen op de kaart te tonen
function toonZorginstellingen(instellingen) {
    // Verwijder bestaande markers
    verwijderMarkers();

    // Voeg nieuwe markers toe
    instellingen.forEach(instelling => {
        const marker = new google.maps.Marker({
            position: instelling.positie,
            map: map,
            title: instelling.naam
        });

        // Voeg info window toe
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <h3>${instelling.naam}</h3>
                <p>Type: ${instelling.type}</p>
                <p>Adres: ${instelling.adres}</p>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        markers.push(marker);
    });
}

// Functie om markers te verwijderen
function verwijderMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}

// Functie voor het zoeken van zorginstellingen
function zoekZorginstellingen() {
    const zorgtype = document.getElementById('zorgtype').value;
    const locatie = document.getElementById('locatie').value.toLowerCase();

    // Filter zorginstellingen op basis van zorgtype
    const gefilterd = zorginstellingen.filter(instelling => {
        const matchType = zorgtype === 'alle' || instelling.type === zorgtype;
        const matchLocatie = instelling.adres.toLowerCase().includes(locatie);
        return matchType && matchLocatie;
    });

    // Toon gefilterde resultaten op de kaart
    toonZorginstellingen(gefilterd);
} 