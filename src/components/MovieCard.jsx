const MovieCard = ({ item }) => {
    const { show } = item;
    return (
        <div>
            <div className="card card-side bg-base-100 shadow-sm">
                <img
                    className="w-xl h-[275px]"
                    src={show?.image?.medium}
                    alt="Movie" />
                <div className="card-body">
                    <h2 className="text-3xl font-semibold">{show?.name}</h2>
                    {show?.summary?.slice(0, 150)}
                    <p className="text-md">{show?.type} | {show?.language}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-secondary">Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;