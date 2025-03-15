// Script om een API key te encoderen naar base64
function encodeApiKey() {
    const apiKey = document.getElementById('apiKey').value;
    const encoded = btoa(apiKey);
    document.getElementById('result').textContent = encoded;
} 