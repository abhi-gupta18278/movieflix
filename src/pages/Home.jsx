import { useEffect, useState } from "react";

import Header from "../component/Header.jsx";
import Sidenav from "../component/Sidenav.jsx";
import Topnav from "../component/Topnav.jsx";
import axiosapi from '../utils/axiosapi.js';
import HorizontalCard from "../component/HorizontalCard.jsx";
import Dropdown from "../component/Dropdown.jsx";
import Loader from '../component/Loader.jsx';

const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getWallpaper = async () => {
    try {
      const { data } = await axiosapi(`/trending/all/day`);
      const randomData = data.results[Math.floor(Math.random() * 20)];
      setWallpaper(randomData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(<h1 className="h-[80vh]  border-box text-3xl sm:text-6xl lg:text-7xl overflow-hidden font-bold text-center p-10">Fail to load Try Again</h1>);
    }
  }

  const getTrending = async () => {
    try {
      const { data } = await axiosapi(`/trending/${category}/day`);
      setTrending(data.results);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(<h1 className="h-[80vh] border-box text-3xl sm:text-6xl overflow-hidden lg:text-7xl font-bold text-center p-10 ">Fail to load Try Again</h1>);
    }
  }

  useEffect(() => {
    setLoading(true);
    Promise.all([getWallpaper(), getTrending()]).finally(() => setLoading(false));
  }, [category]);

  if (loading) return <Loader />; // or <h1>Loading...</h1>
  if (error) return <h1 className="text-red-500">{error}</h1>;

  return (
    <div className="w-screen h-screen flex bg-[#1F1E24] text-white overflow-x-hidden ">
      <Sidenav />
      <div className="w-[100%] xl:ml-[20%] lg:ml-[20%] md:ml-[20%] md:w-[80%] sm:ml-[1.5%] sm:max-w-[100%] mt-12">
        <Topnav />
        <Header data={wallpaper} />
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-zinc-300 p-5 text-2xl">Trending</h1>
          <Dropdown title={"filter"} options={['movie', "tv", 'all']} onoptionChange={setCategory} />
        </div>
        <HorizontalCard title='movie' data={trending} />
      </div>
    </div>
  );
}

export default Home;
