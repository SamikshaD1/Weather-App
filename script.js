const button = document.querySelector("#btn")

document.addEventListener('DOMContentLoaded', function () {

    button.addEventListener('click', function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Store coordinates in localStorage
                    localStorage.setItem('latitude', latitude);
                    localStorage.setItem('longitude', longitude);

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