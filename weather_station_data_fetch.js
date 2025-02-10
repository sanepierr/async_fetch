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

