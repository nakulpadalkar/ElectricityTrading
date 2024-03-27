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

// Function to inject data into MongoDB via backend API
async function injectDataToMongoDB(data) {
    try {
        const response = await fetch('/api/injectData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to inject data to MongoDB');
        }
        console.log('Data injected to MongoDB successfully');
    } catch (error) {
        console.error('Error injecting data to MongoDB:', error);
    }
}

// Update the map with a fixed number of houses and connect them
function updateMap() {
    clearMap(); // Start with a fresh map
    
    var numHouses = 25; // Fixed number of houses
    var dataToInject = []; // Array to store data to be injected into MongoDB
    for (let i = 1; i <= numHouses; i++) {
        var lat = 19.8711 + (Math.random() - 0.5) * 0.1;
        var lon = 75.3717 + (Math.random() - 0.5) * 0.1;
        var solarGenerationPerMonth = Math.random() * (310 - 10) + 10; // Simulating skewed distribution for solar generation
        var consumption = Math.round(Math.pow(Math.random(), 2) * (310 - 10) + 10); // Skewed consumption towards lower values
        
        // Prepare data for injection into MongoDB
        var houseData = {
            lat: lat,
            lon: lon,
            solarGenerationPerMonth: solarGenerationPerMonth,
            consumption: consumption
        };
        dataToInject.push(houseData);

        addRandomHouse(i, numHouses);
    }

    // Inject data into MongoDB
    injectDataToMongoDB(dataToInject);
}

document.addEventListener('DOMContentLoaded', updateMap);

