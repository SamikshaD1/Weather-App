document.addEventListener('DOMContentLoaded', function () {
    const queryParams = new URLSearchParams(window.location.search);
    const latitude = queryParams.get('lat');
    const longitude = queryParams.get('lon');

    if (latitude && longitude) {
        fetchWeatherData(latitude, longitude);
    } else {
        console.error('Latitude and longitude not provided.');
    }

    function fetchWeatherData(latitude, longitude) {
        const apiKey = '0e21cb7ef2fd1e8ab1dafe4b00d5f068';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Unable to fetch weather data.');
                }
                return response.json();
            })
            .then((data) => {
                // Process and display weather data
                console.log(data);
                displayWeatherInfo(data);
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error.message);
                // Handle weather data fetching errors here
            });
    }

    function displayWeatherInfo(data) {
        console.log(data);
        const weatherInfoElement = document.getElementById('weather-info');
        weatherInfoElement.innerHTML = `<iframe src="https://maps.google.com/maps?q=${data.coord.lat}, ${data.coord.lon}&z=15&output=embed" frameborder="0" style="border:0"></iframe>`

        const postion = document.querySelector(".lat-long");

        // WIND direction
        const windDirectionDegrees = `${data.wind.deg}`;
        const windDirection = degreesToDirection(windDirectionDegrees);


        postion.innerHTML = `
        <p class="paraOne">Lat: ${data.coord.lat}</p>
        <p class="paratwo">Lat: ${data.coord.lon}</p>
        `

        document.querySelector(".weather-data").innerHTML = `
        <span>Location: ${data.main.name}</span>
        <span>Wind Speed:  ${data.wind.speed}kmph</span>
        <span>Humidity : ${data.main.humidity}</span>
        <span>Time Zone : GMT +5:30</span>
        <span>Pressure: ${data.main.pressure}atm</span>
        <span>Wind Direction : ${windDirection}</span>
        <span>UV Index : 500</span>
        <span>Feels like: ${data.main.feels_like}°</span>
        `

    }
});

function degreesToDirection(degrees) {
    const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];

    // Convert degrees to a value between 0 and 360
    const normalizedDegrees = (degrees + 360) % 360;
    const index = Math.floor((normalizedDegrees + 22.5) / 45) % 8;
    // * Get the corresponding direction
    const direction = directions[index];
    return direction;
}
