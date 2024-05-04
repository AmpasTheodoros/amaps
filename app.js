// Initialize the map
const map = L.map('map').setView([40.781, 21.409], 10);

// Add the satellite layer
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
}).addTo(map);

// Add labels layer
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
}).addTo(map);

// Define data points with additional information
const dataPoints = [
    { lat: 40.775, lng: 21.409, name: "Florina Center", data: { 'Temperature': [22, 20, 21, 23, 24], 'Humidity': [55, 57, 54, 52, 50], 'WindSpeed': [5, 7, 6, 5, 4], 'Pressure': [1012, 1010, 1011, 1013, 1014] }},
    { lat: 40.800, lng: 21.420, name: "Amyntaio", data: { 'Temperature': [20, 19, 21, 20, 22], 'Humidity': [50, 48, 49, 50, 51], 'WindSpeed': [3, 2, 4, 3, 3], 'Pressure': [1008, 1010, 1009, 1011, 1010] }},
    { lat: 40.780, lng: 21.390, name: "Meliti", data: { 'Temperature': [21, 20, 19, 21, 22], 'Humidity': [52, 53, 54, 52, 50], 'WindSpeed': [4, 5, 4, 4, 3], 'Pressure': [1010, 1011, 1012, 1010, 1009] }}
];

// Function to create markers and attach click event
dataPoints.forEach(point => {
    const marker = L.marker([point.lat, point.lng]).addTo(map);
    marker.bindPopup(`${point.name}<br>Click to see detailed weather data.`);
    marker.on('click', () => updateGraph(point));
});

// Function to update the graph with new data
function updateGraph(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    if (window.lineChart) {
        window.lineChart.destroy();  // Destroy the old chart instance before creating a new one
    }

    window.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            datasets: [
                { label: `Temperature at ${data.name} (°C)`, data: data.data.Temperature, borderColor: 'rgba(255, 99, 132, 1)', fill: false },
                { label: `Humidity at ${data.name} (%)`, data: data.data.Humidity, borderColor: 'rgba(54, 162, 235, 1)', fill: false },
                { label: `Wind Speed at ${data.name} (km/h)`, data: data.data.WindSpeed, borderColor: 'rgba(75, 192, 192, 1)', fill: false },
                { label: `Pressure at ${data.name} (hPa)`, data: data.data.Pressure, borderColor: 'rgba(153, 102, 255, 1)', fill: false }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 30  // Adjust bottom padding to ensure labels fit
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}


// Initial chart setup
updateGraph({
    name: "Select a point",
    data: {
        Temperature: [0, 0, 0, 0, 0],
        Humidity: [0, 0, 0, 0, 0],
        WindSpeed: [0, 0, 0, 0, 0],
        Pressure: [1013, 1013, 1013, 1013, 1013]
    }
});
