import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../component/Topnav.jsx";
import Dropdown from "../component/Dropdown.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../component/Loader.jsx";
import axiosapi from '../utils/axiosapi'
import MovieCard from '../component/Card.jsx'


const Movies = () => {
  const navigate = useNavigate()
  const [movie, setMovie] = useState([]);
  const [category, setCategory] = useState('now_playing')
  const [page, setPage] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  document.title = `MovieFlix | Movie(${category.toUpperCase()})  `

  const getMovie = async () => {
    const { data } = await axiosapi.get(`movie/${category}?page=${page}`)
    // setMovie(data.results)

    if (data.results.length > 0) {
      setMovie((prev) => [...prev, ...data.results])
      setPage((prev) => prev + 1)

    }
    else {
      sethasMore(false)
    }
  }
  const refreshHandler = () => {
    if (movie.length === 0) {
      getMovie()

    }
    else {
      setPage(1)
      setMovie([])
      sethasMore(true)
      getMovie()
    }
  }

  useEffect(() => {
    refreshHandler()
  }, [category])

  return movie.length > 0 ? (
    <div className="p-5 h-screen" >
      <div className="flex items-center gap-3 mb-4">
        <i onClick={() => navigate(-1)} className="text-2xl ri-arrow-left-line cursor-pointer hover:text-blue-600"></i>
        <h1 className="font-semibold text-2xl text-zinc-300">Movie <small className=" text-sm text-zinc-500">( {category} )</small></h1>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Topnav />
        <Dropdown title="movie" options={['popular', 'top_rated', 'upcoming', "now_playing"]} onoptionChange={setCategory} />
      </div>
      <InfiniteScroll
        dataLength={movie.length}
        next={() => getMovie()}
        hasMore={hasMore}
        loader={
          <h2 className="text-center py-4 text-zinc-400">Loading...</h2>
        }
        scrollThreshold={0.9} // fetch earlier (90% scroll) 
      >
        <MovieCard title='movie' data={movie} />
      </InfiniteScroll>


    </div>
  ) : <Loader />;
}


export default Movies;
