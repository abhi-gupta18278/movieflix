import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../component/Dropdown";
import Topnav from "../component/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../component/Loader";
import axiosapi from '../utils/axiosapi'
import TvCard from '../component/Card'

const Tv = () => {
  const navigate = useNavigate()
  const [tv, setTv] = useState([]);
  const [category, setCategory] = useState('airing_today')
  const [page, setPage] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  document.title = `MovieFlix | Tv-shows(${category.toUpperCase()})  `

  const getTv_shows = async () => {
    const { data } = await axiosapi.get(`tv/${category}?page=${page}`)
    if (data.results.length > 0) {
      setTv((prev) => [...prev, ...data.results])
      setPage((prev) => prev + 1)

    }
    else {
      sethasMore(false)
    }
  }
  const refreshHandler = () => {
    if (tv.length === 0) {
      getTv_shows()

    }
    else {
      setPage(1)
      setTv([])
      sethasMore(true)
      getTv_shows()
    }
  }

  useEffect(() => {
    refreshHandler()
  }, [category])

  return tv.length > 0 ? (
    <div className="p-4 sm:p-6 h-screen w-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-white">

      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <i
          onClick={() => navigate(-1)}
          className="text-xl sm:text-2xl ri-arrow-left-line cursor-pointer hover:text-blue-500 transition-colors"
        ></i>
        <h1 className="font-semibold text-xl sm:text-2xl lg:text-3xl text-zinc-200">
          TV Shows{" "}
          <small className="text-sm sm:text-base text-zinc-400">
            ({category})
          </small>
        </h1>
        <div className="ml-auto">
          <Topnav />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-end gap-3 mb-6">
        <Dropdown
          title="TV"
          options={["popular", "on_the_air", "top_rated", "airing_today"]}
          onoptionChange={setCategory}
        />
      </div>

      {/* Content */}
      <div className="h-[75vh] overflow-y-auto pr-2">
        <InfiniteScroll
          dataLength={tv.length}
          next={() => getTv_shows()}
          hasMore={hasMore}
          loader={
            <h2 className="text-center py-4 text-zinc-400">Loading...</h2>
          }
          scrollThreshold={0.9}
        >
          <TvCard title="tv" data={tv} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loader />
  );

}


export default Tv;
