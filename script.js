const location_input = document.querySelector(".location-input");
const output_container = document.getElementById("output");
let output_icon_heading;
let description;
let toggle = true;

location_input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        if (toggle === false) {
            output_icon_heading.remove();
            description.remove();
        }
        output_icon_heading = document.createElement("div");
        output_icon_heading.className = "output-icon-heading";
        const weather_icon = document.createElement("div");
        const output_icon = document.createElement("img");
        weather_icon.className = "output-icon";
        const output_heading = document.createElement("div");
        output_heading.className = "output-heading";
        const current_temp = document.createElement("h2");
        current_temp.className="current_temp";
        const feels_like_temp = document.createElement("h4");
        feels_like_temp.className="feelslike_temp"
        description = document.createElement("p");
        description.className="description"
        weather_icon.appendChild(output_icon);
        output_icon_heading.appendChild(weather_icon);
        output_container.appendChild(output_icon_heading);
        output_container.appendChild(description);
        output_icon_heading.appendChild(output_heading);
        output_heading.appendChild(current_temp);
        output_heading.appendChild(feels_like_temp);
        let location;

        async function fetch_weather() {
            location=e.target.value;
            location=location.trim();
            e.target.value=""
            try {
                if (location.trim().length !== 0) {
                    const value = await fetch(
                        `http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${location}&aqi=no`
                    );
                    const json_value = await value.json();
                    current_temp.innerText = `${json_value.current.temp_c}°`;
                    feels_like_temp.innerText = `Feels ${json_value.current.feelslike_c}°`;
                    e.target.value= json_value.location.name;
                    description.innerText =
                        "Make the most of this nice weather that i generated for you";
                    if (
                        json_value.current.condition.text === "Sunny" ||
                        json_value.current.condition.text === "Mist" ||
                        json_value.current.condition.text === "Overcast"
                    ) {
                        output_icon.src = `./images/weather-images/animated/${json_value.current.condition.text}.svg`;
                    } else {
                        output_icon.src = `./images/weather-images/animated/Sunny.svg`;
                    }

                }
              
            } catch (error) {
                description.textContent = "Location Not Found";
            }
        }
        fetch_weather();
        toggle = false;
    }
});
