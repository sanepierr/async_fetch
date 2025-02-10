const https = require('https');

// Sample Data Processing and Display Functions
function processWeatherStations(data) {
  if (!data?.features) throw new Error('Invalid data format');
  
  return data.features.map(station => ({
    id: station.properties.stationIdentifier,
    name: station.properties.name,
    coordinates: [
      station.geometry.coordinates[1].toFixed(4),
      station.geometry.coordinates[0].toFixed(4)
    ]
  }));
}

function displayStations(stations) {
  console.log('Weather Stations:');
  stations.forEach((station, index) => {
    console.log(`#${index + 1} ${station.id}: ${station.name}`);
    console.log(`   Coordinates: ${station.coordinates.join(', ')}\n`);
  });
}

// 1. Callback Implementation (Node.js https module)
function fetchWithCallback(url, callback) {
  const req = https.get(url, {
    headers: { 'User-Agent': 'WeatherDemo/1.0' }
  }, (res) => {
    if (res.statusCode < 200 || res.statusCode >= 300) {
      return callback(new Error(`HTTP Error ${res.statusCode}`));
    }

    let data = [];
    res.on('data', chunk => data.push(chunk));
    res.on('end', () => {
      try {
        const parsed = JSON.parse(Buffer.concat(data).toString());
        callback(null, parsed);
      } catch (err) {
        callback(new Error('JSON parse error'));
      }
    });
  });

  req.on('error', err => callback(err));
  req.end();
}

// 2. Promise Implementation (Native fetch)
function fetchWithPromise(url) {
  return fetch(url, {
    headers: { 'User-Agent': 'WeatherDemo/1.0' }
  })
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  });
}

// 3. Async/Await Implementation (Native fetch)
async function fetchWithAsyncAwait(url) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'WeatherDemo/1.0' }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Main Execution
const API_URL = 'https://api.weather.gov/stations';

// Run all three methods simultaneously
console.log('Starting data fetching...\n');

// Callback Approach
fetchWithCallback(API_URL, (err, data) => {
  console.log('\n=== Callback Results ===');
  if (err) return console.error('Error:', err.message);
  try {
    const stations = processWeatherStations(data);
    displayStations(stations.slice(0, 3));
  } catch (e) {
    console.error('Processing Error:', e.message);
  }
});

// Promise Approach
fetchWithPromise(API_URL)
  .then(data => {
    console.log('\n=== Promise Results ===');
    const stations = processWeatherStations(data);
    displayStations(stations.slice(3, 6));
  })
  .catch(err => console.error('Error:', err.message));

// Async/Await Approach
(async () => {
  try {
    console.log('\n=== Async/Await Results ===');
    const data = await fetchWithAsyncAwait(API_URL);
    const stations = processWeatherStations(data);
    displayStations(stations.slice(6, 9));
  } catch (err) {
    console.error('Error:', err.message);
  }
})();