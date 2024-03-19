// Initialize the map on the "map" div with a given center and zoom
var map = L.map('map').setView([19.8711, 75.3717], 13);

// Add an OpenStreetMap tile layer
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '© OpenStreetMap contributors'
// }).addTo(map);

// Add a Thunderforest Outdoors tile layer
L.tileLayer('https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=de01857759864395bf5b413a4ed8b94a', {
    attribution: 'Map data &copy; OpenStreetMap contributors, Thunderforest',
    // apikey: 'de01857759864395bf5b413a4ed8b94a',
    maxZoom: 22,
}).addTo(map);

