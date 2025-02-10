// Sample Data Processing and Display Functions
function processWeatherStations(data) {
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
    console.log('%cWeather Stations:', 'font-weight: bold; color: #2c3e50;');
    stations.forEach(station => {
        console.log(
        `%c${station.id}: ${station.name}`,
        'color: #2980b9;',
        `\nCoordinates: ${station.coordinates.join(', ')}`
        );
    });
    }

  // 1. Callback Implementation
    function fetchWithCallback(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('User-Agent', 'WeatherDemo/1.0');
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
        try {
            const data = JSON.parse(xhr.responseText);
            callback(null, data);
        } catch (err) {
            callback(new Error('Failed to parse JSON'), null);
        }
        } else {
        callback(new Error(`HTTP Error ${xhr.status}`), null);
        }
    };
    xhr.onerror = function() {
        callback(new Error('Network Failure'), null);
    };
    xhr.send();
    }



  // 2. Promise Implementation
    function fetchWithPromise(url) {
    return fetch(url, {
    headers: { 'User-Agent': 'WeatherDemo/1.0' }
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        return response.json();
    });
    }
