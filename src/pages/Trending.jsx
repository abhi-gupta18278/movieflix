import { useNavigate } from "react-router-dom";
import Dropdown from "../component/Dropdown";
import Topnav from "../component/Topnav";
import axiosapi from '../utils/axiosapi'
import { useEffect, useState } from "react";
import Loader from "../component/Loader";
import TrendingCard from "../component/Card";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState('all');
  const [duration, setDuration] = useState('day');
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = `MovieFlix | Trending(${category.toUpperCase()})  `



  const getTrending = async () => {
    try {
      const { data } = await axiosapi(`/trending/${category}/${duration}?page=${page}`)

      if (data.results.length > 0) {
        setTrending((prev) => [...prev, ...data.results])
        setPage((prev) => prev + 1)
      }
      else {
        sethasMore(false)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const refreshHandler = () => {
    if (trending.length === 0) {
      getTrending()

    }
    else {
      setPage(1)
      setTrending([])
      sethasMore(true)
      getTrending()
    }
  }

  useEffect(() => {
    refreshHandler()
  }, [category, duration])


  return trending.length > 0 ? (
    <div className="p-4 sm:p-6 h-screen w-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <i
          onClick={() => navigate(-1)}
          className="text-xl sm:text-2xl ri-arrow-left-line cursor-pointer hover:text-blue-500 transition-colors"
        ></i>
        <h1 className="font-semibold text-xl sm:text-2xl lg:text-3xl text-zinc-200">
          Trending
        </h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-end  gap-3 mb-6">
        <Topnav />
        <div className="flex flex-wrap gap-3">
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            onoptionChange={setCategory}
          />
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            onoptionChange={setDuration}
          />
        </div>
      </div>

      {/* Content */}
      <div className="h-[75vh] overflow-y-auto pr-2">
        <InfiniteScroll
          dataLength={trending.length}
          next={() => getTrending()}
          hasMore={hasMore}
          loader={<h4 className="text-center py-4">Loading...</h4>}
        >
          <TrendingCard title="movie" data={trending} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default Trending;
