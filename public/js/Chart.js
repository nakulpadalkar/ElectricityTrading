document.addEventListener('DOMContentLoaded', function() {
    updateMap(); // Existing function to populate and connect houses
    
    // Generate dummy solar generation data
    const solarData = Array.from({ length: 36 * 60 }, () => Math.floor(Math.random() * 10));
  
    // Setup Chart.js
    const ctx = document.getElementById('solarChart').getContext('2d');
    const solarChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: solarData.length }, (_, i) => i + 'min'),
        datasets: [{
          label: 'Solar Generation (kW)',
          data: solarData,
          borderColor: 'rgb(255, 159, 64)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            ticks: {
              // Customize x-axis ticks to show fewer labels for readability
              callback: function(val, index) {
                // Show a label every 360 minutes (6 hours)
                return index % 360 === 0 ? this.getLabelForValue(val) : '';
              },
            }
          }
        }
      }
    });
  });
  