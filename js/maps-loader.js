// Maps loader functie
function loadGoogleMaps() {
    // Base64 gecodeerde key (dit is nog steeds niet 100% veilig, maar beter dan plaintext)
    const encodedKey = 'QUl6YVN5QUJLTC1PMUMwZjgtNUpCVWRWcUoxeVgwLWRHU2t0RVV3';
    
    try {
        const key = atob(encodedKey);
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
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