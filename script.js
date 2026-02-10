$(document).ready(function () {

    $("#btnGo").on("click", function () {
        const city = $("#cityInput").val().trim();

        if (city === "") {
            $("#weatherResult").html("<p class='text-danger mb-0'>Please enter a city.</p>");
            return;
        }

        $("#weatherResult").html("<p class='mb-0'>Looking up city coordinates…</p>");
        $("#artResult").html("<p class='text-muted mb-0'>No artwork loaded yet</p>");
        $("#keywordResult").text("None yet");

        const geoUrl =
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(city) +
            "&count=1&language=en&format=json";

        $.getJSON(geoUrl, function (data) {
            if (!data.results || data.results.length === 0) {
                $("#weatherResult").html("<p class='text-danger mb-0'>City not found.</p>");
                return;
            }

            const place = data.results[0];
            const lat = place.latitude;
            const lon = place.longitude;

            $("#weatherResult").html(
                "<p class='mb-1'><strong>City:</strong> " + place.name + "</p>" +
                "<p class='mb-1'><strong>Latitude:</strong> " + lat + "</p>" +
                "<p class='mb-0'><strong>Longitude:</strong> " + lon + "</p>" +
                "<p class='mb-0'>Fetching current weather…</p>"
            );

            const weatherUrl =
                "https://api.open-meteo.com/v1/forecast" +
                "?latitude=" + lat +
                "&longitude=" + lon +
                "&current_weather=true";

            $.getJSON(weatherUrl, function (w) {
                if (!w.current_weather) {
                    $("#weatherResult").append("<p class='text-danger mb-0'>Weather data unavailable.</p>");
                    return;
                }

                const temp = w.current_weather.temperature;
                const wind = w.current_weather.windspeed;
                const code = w.current_weather.weathercode;

                $("#weatherResult").html(
                    "<p class='mb-1'><strong>City:</strong> " + place.name + "</p>" +
                    "<p class='mb-1'><strong>Temperature:</strong> " + temp + " °C</p>" +
                    "<p class='mb-1'><strong>Wind speed:</strong> " + wind + " km/h</p>" +
                    "<p class='mb-0'><strong>Weather code:</strong> " + code + "</p>"
                );

            }).fail(function () {
                $("#weatherResult").append("<p class='text-danger mb-0'>Weather API error.</p>");
            });


        }).fail(function () {
            $("#weatherResult").html("<p class='text-danger mb-0'>Geocoding API error.</p>");
        });
    });

    $("#btnClear").on("click", function () {
        $("#cityInput").val("");
        $("#weatherResult").html("<p class='text-muted mb-0'>No weather loaded yet</p>");
        $("#artResult").html("<p class='text-muted mb-0'>No artwork loaded yet</p>");
        $("#keywordResult").text("None yet");
    });

});

