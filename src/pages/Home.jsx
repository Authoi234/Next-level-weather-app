import { useState } from "react";
import LocationModal from "../components/LocationModal";

const Home = () => {
    const [click, setClick] = useState("");

    console.log(click);
    return (
        <div>
            <h1 className="text-center text-6xl font-extrabold text-blue-300">NextLevel <span className="text-blue-400">Weather</span></h1>
            <p className="text-center text-md text-gray-400 py-4">Check Your Weather Today In Next Level</p>
            <div className="text-center"><button onClick={() => setClick("clicked")} type="button" className="text-lg font-medium hover:scale-105 transition-all delay-75 bg-blue-500 px-5 py-1 rounded-3xl text-gray-100 cursor-pointer">Check Weather</button></div>
            {click  && <LocationModal onClose={() => setClick("")} />}
        </div>
    );
};

export default Home;