// Initialize an array to store waypoints for routing
let waypoints = [];

// Function to add a house marker and save its location as a waypoint
function addRandomHouse(index) {
    var lat = 19.8711 + (Math.random() - 0.5) * 0.1;
    var lon = 75.3717 + (Math.random() - 0.5) * 0.1;
    var panelArea = Math.random() * (40 - 10) + 10; // Random panel area between 10m² and 40m²
    var efficiency = 0.20; // 20%
    var averageIrradiance = 170; // W/m²
    var solarPotential = panelArea * efficiency * averageIrradiance; // Simple potential calculation

    L.marker([lat, lon])
        .addTo(map)
        .bindPopup('House' + index + ': Solar Potential = ' + solarPotential.toFixed(2) + 'W');
}


// Add 25 random houses to the map and collect their locations for routing
for (let i = 1; i <= 25; i++) {
    addRandomHouse(i);
}

// Function to add the routing control after all houses and waypoints are added
function addRoutingControl() {
    L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: true,
        lineOptions: {
            styles: [{color: '#336699', opacity: 1, weight: 1.5}]
        },
        createMarker: function() { return null; } // Disable default markers
    }).addTo(map);
}

// Call the function to add the routing control to the map
addRoutingControl();
