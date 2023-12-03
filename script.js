const button = document.querySelector("#btn")

document.addEventListener('DOMContentLoaded', function () {

    button.addEventListener('click', function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    window.location.href = `/Pages/weather.html?lat=${latitude}&lon=${longitude}`;
                },
                () => {
                    document.querySelector(".error-location").innerHTML = "Error getting location: User denied Geolocation";
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    });
});