var mapMarkers = [];
var waypoints = []; // Track waypoints for routing

// Function to clear the map of markers and routes
function clearMap() {
    mapMarkers.forEach(marker => map.removeLayer(marker));
    mapMarkers = [];
    waypoints = [];
    if (window.routingControl) {
        map.removeControl(window.routingControl);
    }
}

// Simplified function to calculate solar potential and consumption
function calculateEnergy() {
    return {
        solarGenerationPerHour: (Math.random() * (310 - 10) + 10) / 720,
        consumptionPerHour: Math.round((Math.pow(Math.random(), 2) * (310 - 10) + 10) / 720),
    };
}

// Streamlined function to add a random house and calculate solar potential
function addRandomHouse(index) {
    var { lat, lon } = { lat: 19.8711 + (Math.random() - 0.5) * 0.1, lon: 75.3717 + (Math.random() - 0.5) * 0.1 };
    var { solarGenerationPerHour, consumptionPerHour } = calculateEnergy();
    
    var marker = L.marker([lat, lon]).addTo(map).bindTooltip(
        `House ${index}<br>Solar Generation: ${solarGenerationPerHour.toFixed(2)} kWh/hour<br>Consumption: ${consumptionPerHour} kWh/hour`,
        { permanent: false, direction: 'top' }
    );
    
    mapMarkers.push(marker);
    waypoints.push(L.latLng(lat, lon));

    return { lat, lon, solarGenerationPerHour, consumptionPerHour };
}

// Function to draw routes connecting all waypoints
function connectHousesWithRoutes() {
    if (waypoints.length > 1) {
        window.routingControl = L.Routing.control({
            waypoints: waypoints,
            routeWhileDragging: false,
            createMarker: () => null,
            lineOptions: { styles: [{color: '#336699', opacity: 0.6, weight: 4}] },
            addWaypoints: false
        }).addTo(map);
    }
}

// Simplified function to inject data into MongoDB via backend API
async function injectDataToMongoDB(data) {
    try {
        const response = await fetch('/api/injectData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to inject data to MongoDB');
        console.log('Data injected to MongoDB successfully');
    } catch (error) {
        console.error('Error injecting data to MongoDB:', error);
    }
}

// Update the map with a fixed number of houses and connect them
async function updateMap() {
    clearMap(); // Start with a fresh map
    
    var numHouses = 25; // Fixed number of houses
    var dataToInject = [];
    for (let i = 1; i <= numHouses; i++) {
        var houseData = addRandomHouse(i);
        dataToInject.push(houseData);
    }

    // Connect the houses with routes after the last house is added
    connectHousesWithRoutes();

    // Inject data into MongoDB
    await injectDataToMongoDB(dataToInject);
}

document.addEventListener('DOMContentLoaded', updateMap);
