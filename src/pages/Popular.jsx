import { useEffect, useState } from "react";
import Dropdown from "../component/Dropdown";
import Topnav from "../component/Topnav";
import PopularCard from "../component/Card";
import axiosapi from '../utils/axiosapi.js'
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loader from "../component/Loader";



const Popular = ({ }) => {
  const navigate = useNavigate()
  const [popular, setPopular] = useState([]);
  const [category, setCategory] = useState('movie')
  const [page, setPage] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  document.title = `MovieFlix | Popular(${category.toUpperCase()})  `

  const getPopular = async () => {
    const { data } = await axiosapi.get(`${category}/popular?page=${page}`)
    // setPopular(data.results)
    if (data.results.length > 0) {
      setPopular((prev) => [...prev, ...data.results])
      setPage((prev) => prev + 1)

    }
    else {
      sethasMore(false)
    }
  }
  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopular()

    }
    else {
      setPage(1)
      setPopular([])
      sethasMore(true)
      getPopular()
    }
  }

  useEffect(() => {
    refreshHandler()
  }, [category])

  return popular.length > 0 ? (
    <div className="p-5 sm:p-6 h-screen w-screen" >
      <div className="flex items-center flex-wrap  gap-3 mb-4">
        <i onClick={() => navigate(-1)} className="text-2xl ri-arrow-left-line cursor-pointer hover:text-blue-600"></i>
        <h1 className="font-semibold text-xl  sm:text-2xl lg:text-3xl text-zinc-300">Popular</h1>
        <Topnav />
      </div>
      <div className="flex items-center  justify-end gap-4">
        <Dropdown title={"Category"} options={["tv", "movie"]} onoptionChange={setCategory} />
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={() => getPopular()}
        hasMore={hasMore}
        loader={
          <h2 className="text-center py-4 text-zinc-400">Loading...</h2>
        }
        scrollThreshold={0.9} // fetch earlier (90% scroll) 
      >
        <PopularCard title="movie" data={popular} />
      </InfiniteScroll>


    </div>
  ) : <Loader />;
}

export default Popular;
