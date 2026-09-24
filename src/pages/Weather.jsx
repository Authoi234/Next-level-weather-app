import { useLocation } from "react-router";
import { getWeather } from "../services/get-weather";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const Weather = () => {
    const value = useLocation();
    const place = value.state.location;
    const [weather, setWeather] = useState(null);
    console.log(weather);
    useEffect(() => {
        if (!place) return;
        const fetch_weather = async () => {
            try {
                const weather = await getWeather(place);
                setWeather(weather);
            } catch (error) {
                console.log(error);
            }
        }

        fetch_weather();
    }, [place])

    const Rain = ["drizzle", "rain", "freezing_rain"];

    function getRecommandations(weather) {
        if (!weather) return null;

        // 1. Weather you need to prepare for.
        if (weather?.condition === "snow") {
            return { type: "snow", label: "Snow Alert", text: "It's snowing. Wear warm clothes and take it slow outside." };
        }
        if (Rain.includes(weather?.condition)) {
            return { type: "rain", label: "Rain Alert", text: "It's raining. Don't forget to take an umbrella with you." };
        }
        if (weather?.condition === "fog") {
            return { type: "fog", label: "Fog Alert", text: "It's foggy. Drive carefully and keep some distance from other vehicles." };
        }

        // 2. Temperatures worth warning about (in °C).
        if (weather?.temperature >= 32) {
            return { type: "hot", label: "Hot Day", text: "It's quite hot today. Take a water bottle with you." };
        }
        if (weather?.temperature <= 15) {
            return { type: "cold", label: "Cold Day", text: "It's cold today. Wear warm clothes before heading out." };
        }
        if (weather?.temperature >= 28) {
            return { type: "warm", label: "Warm Day", text: "It's warm today. Take some water with you." };
        }

        // 3. Comfortable temperature, so just describe the sky.
        if (weather?.condition === "clear") {
            return { type: "sunny", label: "Sunny Day", text: "Sunny skies ahead. Take water and consider carrying sunglasses." };
        }
        if (weather?.condition === "partly_cloudy" || weather?.condition === "cloudy") {
            return { type: "cloudy", label: "Cloudy Day", text: "Mostly cloudy today. A light jacket might come in handy." };
        }

        // 4. Nothing special to report.
        return { type: "pleasant", label: "Perfect Day", text: "The weather looks comfortable today. Enjoy your day!" };
    }

    return (
        <div>
            <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-3">
                    <div className="shadow-2xl rounded-2xl p-5">
                        <div className="space-y-3">
                            <h1 className="text-2xl text-blue-500 font-semibold">Todays Weather Details</h1>
                            <div className="flex items-center gap-3">
                                <MapPin size={30} />
                                <h2 className="text-4xl text-purple-500 font-semibold">{place.name}</h2>
                            </div>
                            <div className="flex items-center gap-16">
                                <h3 className="text-6xl text-purple-900 font-extrabold">{weather?.temperature} C</h3>
                                <p className="text-4xl text-purple-800 font-extrabold">{weather?.description}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="rounded-2xl shadow-2xl p-4 text-center">
                                    <h3 className="text-lg text-purple-900 font-bold">Feels Like</h3>
                                    <p className="text-4xl text-purple-800 font-extrabold">{weather?.feelsLike}</p>
                                </div>
                                <div className="rounded-2xl shadow-2xl p-4 text-center">
                                    <h3 className="text-lg text-purple-900 font-bold">Humidity</h3>
                                    <p className="text-4xl text-purple-800 font-extrabold">{weather?.humidity}</p>
                                </div>
                                <div className="rounded-2xl shadow-2xl p-4 text-center">
                                    <h3 className="text-lg text-purple-900 font-bold">Wind Speed</h3>
                                    <p className="text-4xl text-purple-800 font-extrabold">{weather?.wind}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="shadow-2xl rounded-2xl p-5">
                        <h2 className="text-blue-950 font-bold text-xl">Smart Recommandations </h2>
                        <div>
                            {getRecommandations(weather)?.text}
                        </div>

                    </div>
                </div>

                <div className="shadow-2xl flex justify-between flex-col items-center rounded-2xl p-5">
                    <div className="">
                        <h2 className="text-blue-950 font-bold text-xl">Live in {place?.name}</h2>
                    </div>
                    <div className="flex  items-center justify-center">
                        <p className="text-5xl text-blue-900 font-extrabold">{weather?.condition}</p>
                    </div>
                    <div className="flex  items-center justify-center">
                        <span className="rounded-full border-purple-400 p-2 border-2 font-medium text-lg">Feel's Like : {weather?.feelsLike}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;