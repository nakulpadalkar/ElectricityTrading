// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// const testData = [0, 10, 5, 2, 20, 30, 45];


document.addEventListener('DOMContentLoaded', function() {

  // Fetch energy data and then plot charts
  fetch('/api/energyData')
    .then(response => response.json())
    .then(data => {
      // Assuming 'data' is an array of objects with 'time', 'generation', and 'consumption' properties
      const labels = data.map(item => item.time);
      const generationData = data.map(item => item.generation);
      const consumptionData = data.map(item => item.consumption);

      const ctxGeneration = document.getElementById('generationChart').getContext('2d');
      const generationChart = new Chart(ctxGeneration, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Energy Generation (kWh)',
            data: [0, 10, 5, 2, 20, 30, 45],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        }
      });

      const ctxConsumption = document.getElementById('consumptionChart').getContext('2d');
      const consumptionChart = new Chart(ctxConsumption, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Energy Consumption (kWh)',
            data: [0, 10, 5, 2, 20, 30, 45],
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          }]
        }
      });
    })
    .catch(error => {
      console.error('Error fetching energy data:', error);
      // Display an error message directly in the UI
      document.getElementById('generationChart').textContent = 'Failed to load energy generation data.';
      document.getElementById('consumptionChart').textContent = 'Failed to load energy consumption data.';
    });
});
