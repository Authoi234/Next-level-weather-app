import { SearchIcon } from "lucide-react";
import { useState } from "react";
import MovieCard from "../components/MovieCard";

const Shows = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const value = search.trim();

        try {
            const res = await fetch(`https://api.tvmaze.com/search/shows?q=${value}`);
            if (!res.ok) throw new Error("Failed to fetch shows");
            const data = await res.json();
            setData(data);
            console.log(data)
        } catch (error) {
            console.error("Error fetching shows:", error);
        }
    };

    return (
        <div className="mt-23.5 max-w-5xl">
            <form onSubmit={handleSubmit} className="pb-10">
                <legend className="text-3xl font-semibold py-5">Which show come to your mind?</legend>
                <div className="aura flex join">
                    <div className="join-item w-full"><input type="text" onChange={(e) => setSearch(e.target.value)} className="input input-xl w-full" placeholder="Type here" /></div>
                    <button className="btn btn-xl btn-neutral join-item" type="submit"><SearchIcon /></button>
                </div>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.map((item)=><MovieCard item={item}></MovieCard>)}
            </div>
        </div>
    );
};

export default Shows;