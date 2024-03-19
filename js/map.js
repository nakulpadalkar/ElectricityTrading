// Initialize the map on the "map" div with a given center and zoom
var map = L.map('map').setView([51.505, -0.09], 13);

// Add an OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
