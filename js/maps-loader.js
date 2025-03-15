// Maps loader functie
function loadGoogleMaps() {
    try {
        if (typeof MAPS_API_KEY === 'undefined') {
            throw new Error('Google Maps API sleutel is niet geconfigureerd');
        }

        // Controleer of we op een toegestaan domein zijn
        const allowedDomains = [
            'mha-1915.github.io',
            'localhost',
            '127.0.0.1'
        ];

        const currentDomain = window.location.hostname;
        if (!allowedDomains.some(domain => currentDomain === domain || currentDomain.endsWith('.' + domain))) {
            throw new Error('Deze website mag geen gebruik maken van de Google Maps API key');
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onerror = () => {
            document.getElementById('map').innerHTML = 
                '<p class="error">Er is een probleem met het laden van de kaart. Probeer de pagina te verversen.</p>';
        };
        document.body.appendChild(script);
    } catch (error) {
        console.error('Fout bij het laden van de kaart:', error);
        document.getElementById('map').innerHTML = 
            '<p class="error">Er is een probleem met het laden van de kaart. Probeer de pagina te verversen.</p>';
    }
}