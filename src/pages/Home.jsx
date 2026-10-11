import { useEffect, useState } from "react";
import Banner1 from "../../src/assets/banner_image.png";
import Banner2 from "../../src/assets/banner_image2.jpg";
import { Link } from "react-router";

const Home = () => {
    const [randomNumber, setRandomNumber] = useState(1);

    useEffect(() => {
        setRandomNumber(Math.floor(Math.random() * 11));
    }, []);

    const chooseBanner = () => randomNumber % 2 == 0 ? Banner1 : Banner2;

    return (
        <div className="w-full min-h-screen flex justify-center items-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${chooseBanner()})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
            <div className="text-center text-white ">
                <div className="w-3xl">
                    <h1 className="text-5xl font-bold">Stop searching for the hype. <br /> Start watching it.</h1>
                    <p className="py-6">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab, accusantium quisquam. Tempora quidem recusandae error, sit odit provident, id illum, distinctio blanditiis mollitia eligendi iusto. Velit vel officia voluptas placeat.
                    </p>
                    <div className="aura aura-dual aura-lg text-blue-300">
                        <Link to={'/movies'}><button className=" btn btn-primary text-white btn-wide btn-xl text-xl">Explore Now</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;