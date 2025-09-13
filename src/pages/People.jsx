import { useEffect, useState } from 'react';
import axiosapi from '../utils/axiosapi.js'
import InfiniteScroll from 'react-infinite-scroll-component';
import Topnav from '../component/Topnav';
import PeopleCard from '../component/Card';
import Loader from '../component/Loader';
import { useNavigate } from 'react-router-dom';

const People = () => {
  const navigate = useNavigate()
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  document.title = "MovieFlix | People"

  const getPeople = async () => {
    const { data } = await axiosapi.get(`person/popular?page=${page}`)
    if (data.results.length > 0) {
      setPerson((prev) => [...prev, ...data.results])
      setPage((prev) => prev + 1)

    }
    else {
      sethasMore(false)
    }
  }
  useEffect(() => {

    getPeople()
  }, [])

  return person.length > 0 ? (
    <div className='p-5 sm:p-6 h-screen w-screen  text-white'>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <i onClick={() => navigate(-1)} className="text-xl sm:text-2xl ri-arrow-left-line cursor-pointer hover:text-blue-600"></i>
        <h1 className="font-semibold text-xl sm:text-2xl lg:text-3xl text-zinc-300">People </h1>


        <Topnav />

      </div>
      <InfiniteScroll
        dataLength={person.length}
        next={() => getPeople()}
        hasMore={hasMore}
        loader={<h2 className="text-center py-4 text-zinc-400">Loading...</h2>}
        scrollThreshold={0.9}
      >
        <PeopleCard title="person" data={person} />
      </InfiniteScroll>

    </div>
  ) : <Loader />;
}

export default People;
