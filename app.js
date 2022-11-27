// WEATHER APP

// First time dealing with an API Fetch

let geolocation;
window.addEventListener("load", (() => {
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>{
            geolocation = position.geolocation;
            const api = `http://api.weatherapi.com/v1/current.json?key=ec3b1183c8ee46db9fe102234222611&q=${location}`;

            fetch(api)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data); // TODO: Delete this line after debugging and fetching needed info.
                const condition = data.current.condition;
                const region = document.querySelector(".location-timezone");
                const degrees = document.querySelector(".degrees");
                const addons = document.querySelector(".addons");
                region.textContent = data.location.region;
                degrees.textContent = data.current.temp_c + "C";
                addons.innerHTML = condition.text + `<img width='100' height='100' src='${condition.icon}' alt='${condition.text}' />`;
            })
        })
    } 
    else
        console.log("Error: Cannot find location.");
}));
