// Maps loader functie
function loadGoogleMaps() {
    try {
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