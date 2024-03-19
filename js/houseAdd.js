// Initialize an array to store waypoints for routing
let waypoints = [];

// Function to add a house marker and save its location as a waypoint
function addRandomHouse(index) {
    var lat = 19.8711 + (Math.random() - 0.5) * 0.1; // Adjusted for a broader spread around Aurangabad
    var lon = 75.3717 + (Math.random() - 0.5) * 0.1; // Adjusted for a broader spread around Aurangabad
    
    // Add the generated location as a waypoint for routing
    waypoints.push(L.latLng(lat, lon));
    
    // Create and add a marker for the house to the map
    L.marker([lat, lon])
        .addTo(map)
        .bindPopup('House' + index);
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
            styles: [{color: 'red', opacity: 1, weight: 1.5}]
        },
        createMarker: function() { return null; } // Disable default markers
    }).addTo(map);
}

// Call the function to add the routing control to the map
addRoutingControl();
