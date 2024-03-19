function addRandomHouse() {
    var lat = 51.505 + (Math.random() - 0.5) * 0.02;
    var lon = -0.09 + (Math.random() - 0.5) * 0.02;
    L.marker([lat, lon]).addTo(map).bindPopup('Random House').openPopup();
}

// Add 5 random houses to the map
for (let i = 0; i < 5; i++) {
    addRandomHouse();
}
