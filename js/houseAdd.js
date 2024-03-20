var mapMarkers = [];
var waypoints = []; // Track waypoints for routing

// Function to clear the map of markers and routes
function clearMap() {
    mapMarkers.forEach(marker => map.removeLayer(marker));
    mapMarkers = [];
    waypoints = [];
    if (window.routingControl) {
        map.removeControl(window.routingControl); // Remove existing routes
    }
}

// Adds a random house and calculates solar potential
function addRandomHouse(index, numHouses) {
    var lat = 19.8711 + (Math.random() - 0.5) * 0.1;
    var lon = 75.3717 + (Math.random() - 0.5) * 0.1;
    var solarGenerationPerMonth = Math.random() * (310 - 10) + 10; // Simulating skewed distribution for solar generation
    var consumption = Math.round(Math.pow(Math.random(), 2) * (310 - 10) + 10); // Skewed consumption towards lower values
    
    var marker = L.marker([lat, lon]).addTo(map).bindTooltip(
        'House' + index +
        '<br>Solar Generation: ' + solarGenerationPerMonth.toFixed(2) + ' kWh/month' +
        '<br>Consumption: ' + consumption + ' kWh/month', 
        { permanent: false, direction: 'top' }
    );
    
    mapMarkers.push(marker);
    waypoints.push(L.latLng(lat, lon));

    // Connect the houses with routes after the last house is added
    if (index === numHouses) {
        connectHousesWithRoutes();
    }
}

// Function to draw routes connecting all waypoints
function connectHousesWithRoutes() {
    if (waypoints.length > 1) {
        window.routingControl = L.Routing.control({
            waypoints: waypoints,
            routeWhileDragging: false,
            createMarker: function() { return null; }, // Suppress additional markers
            lineOptions: {
                styles: [{color: '#336699', opacity: 0.6, weight: 4}]
            },
            addWaypoints: false
        }).addTo(map);
    }
}

// Update the map with a fixed number of houses and connect them
function updateMap() {
    clearMap(); // Start with a fresh map
    
    var numHouses = 25; // Fixed number of houses
    for (let i = 1; i <= numHouses; i++) {
        addRandomHouse(i, numHouses);
    }
}

document.addEventListener('DOMContentLoaded', updateMap);
