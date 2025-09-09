import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosapi from '../utils/axiosapi'

const Topnav = () => {
  const [query, setQuery] = useState('')
  const [searchs, setsearchs] = useState([]);

  const searchBardata = async () => {
    try {
      const { data } = await axiosapi(`/search/multi?query=${query}`)
      setsearchs(data.results)
      // console.log(searchs)


    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    searchBardata()
  }, [query])
  return (

    <div className="fixed top-0 left-[20%] w-[80%] lg:w-[80%] md:w-[60%] sm:w-full flex flex-col items-center py-2 shadow-md z-10">
      {/* Search Input */}
      <div className="flex items-center gap-3 w-[90%] sm:w-[95%] md:w-[70%] lg:w-[50%] bg-zinc-900 px-4 py-2 rounded-lg">
        <i className="ri-search-line text-2xl text-zinc-500"></i>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="flex-1 text-white text-sm sm:text-base lg:text-lg border-none outline-none bg-transparent placeholder:text-zinc-400"
          type="text"
          placeholder="Search movies, TV shows, people..."
        />
        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="ri-close-fill text-2xl text-zinc-500 cursor-pointer hover:text-red-500 transition"
          />
        )}
      </div>

      {/* Dropdown Results */}
      {query.length > 0 && searchs.length > 0 && (
        <div className="w-[90%] sm:w-[95%] md:w-[70%] lg:w-[50%] max-h-[60vh] mt-2 rounded-xl bg-white shadow-lg overflow-y-auto overflow-x-hidden">
          {searchs.map((item, index) => (
            <Link key={index} to={`/${item.media_type}/details/${item.id}`}>
              <div className="flex items-center gap-4 p-3 border-b border-zinc-200 hover:bg-zinc-100 transition duration-300 ease-in-out cursor-pointer">
                <img
                  className="h-16 w-16 object-cover rounded-md"
                  src={
                    item.backdrop_path || item.poster_path || item.profile_path
                      ? `https://image.tmdb.org/t/p/w200/${item.backdrop_path ||
                      item.poster_path ||
                      item.profile_path
                      }`
                      : "/noImage.jpg"
                  }
                  alt={item.name || item.title || "Media thumbnail"}
                />
                <h1 className="text-sm sm:text-md font-semibold text-zinc-700">
                  {item.name || item.original_title || item.title}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>

  );
}

export default Topnav;
