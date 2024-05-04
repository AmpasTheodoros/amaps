// Initialize the map on the "map" div at a specific location
const map = L.map('map').setView([40.781, 21.409], 10); // Coordinates roughly centering Florina

// Add an OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Sample data points around Florina with mock data
const dataPoints = [
    { lat: 40.775, lng: 21.409, name: "Florina Center", temperature: 22, humidity: 55 },
    { lat: 40.800, lng: 21.420, name: "Amyntaio", temperature: 20, humidity: 50 },
    { lat: 40.780, lng: 21.390, name: "Meliti", temperature: 21, humidity: 52 }
];

// Function to create markers and attach click event
dataPoints.forEach(point => {
    const marker = L.marker([point.lat, point.lng]).addTo(map);
    marker.bindPopup(`${point.name}<br>Click to see weather data.`);
    marker.on('click', () => updateGraph(point));
});

// Function to update the graph with new data
function updateGraph(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    if (window.bar != undefined) {
        window.bar.destroy(); // Destroy the old chart instance before creating new one
    }
    window.bar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Temperature (°C)', 'Humidity (%)'],
            datasets: [{
                label: `Data for ${data.name}`,
                data: [data.temperature, data.humidity],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initial chart setup, can be empty or based on default data
updateGraph({ name: "Select a point", temperature: 0, humidity: 0 });
