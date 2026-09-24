import { X } from "lucide-react"
import { useState } from "react";
import { getGeolocation } from "../services/get-geolocation";
import { useNavigate } from "react-router";

const LocationModal = ({ onClose }) => {
    const navigate = useNavigate();
    const [city, setCity] = useState("");
    const [error, setError] = useState("");

    const goToPage = (location) => {
        navigate("/weather", { state: { location } })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const value = city.trim();
        // console.log(value);
        try {
            const location = await getGeolocation(value);
            if (!location) {
                setError("Geocoding Request Failed");
            }
            goToPage(location)
        } catch (error) {
            setError(error);
        }
    }

    const handleGeoLocation = () => {
        if (!navigator.geolocation) {
            setError("Geo location not found");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (positions) => {
                const { latitude, longitude } = positions.coords;
                goToPage({ name: "Your Location", lat: latitude, lon: longitude });
            }, (error) => {
                setError(error);
            }, {
            timeout: 10000
        })
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-950/60">
            <div className="h-[300px] w-[400px] shadow-2xl p-5 rounded-2xl text-center bg-gray-100">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-medium">Where are you today?</h2>
                    <button onClick={onClose} className="shadow-lg rounded-full hover:bg-gray-400 p-1 transition-all ">
                        <X />
                    </button>
                </div>
                <div className="pt-5">
                    <form onSubmit={handleSubmit}>
                        <input type="text" onChange={(e) => setCity(e.target.value)} placeholder="Enter City Name" className="w-full border p-1 rounded-2xl" />
                        <div className="text-center py-3">
                            <button type="submit" className="text-lg w-full font-medium hover:scale-105 transition-all delay-75 bg-blue-500 px-5 py-1 rounded-3xl text-gray-100 cursor-pointer">Get Weather</button>
                        </div>
                    </form>
                </div>
                <div className="flex items-center">
                    <hr style={{ width: "50%" }} />
                    <span>OR</span>
                    <hr style={{ width: "50%" }} />
                </div>
                <div className="pt-5">
                    <div className="text-center">
                        <button onClick={handleGeoLocation} type="button" className="text-lg font-medium w-full hover:scale-105 transition-all delay-75 bg-blue-500 px-5 py-1 rounded-3xl text-gray-100 cursor-pointer">Use My Location </button>
                    </div>
                </div>
                {error && <div className="py-1"><p className="text-red-600 font-medium text-lg">{error}</p></div>}
            </div>
        </div>
    );
};

export default LocationModal;