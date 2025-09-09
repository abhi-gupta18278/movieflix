import { useEffect, useState } from "react";

import Header from "../component/Header.jsx";
import Sidenav from "../component/Sidenav.jsx";
import Topnav from "../component/Topnav.jsx";
import axiosapi from '../utils/axiosapi.jsx'
import HorizontalCard from "../component/HorizontalCard.jsx";
import Dropdown from "../component/Dropdown.jsx";
import Loader from '../component/Loader.jsx';


const Home = () => {
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [categery, setCategery] = useState('all')

  const getWallpaper = async () => {
    try {
      const { data } = await axiosapi(`/trending/all/day`)
      // console.log(data)
      const randomData = data.results[Math.floor(Math.random() * 20)]
      setwallpaper(randomData)

    } catch (error) {
      console.log(error)
    }
  }
  const getTrending = async () => {
    try {
      const { data } = await axiosapi(`/trending/${categery}/day`)

      setTrending(data.results)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    !wallpaper && getWallpaper()
    getTrending()
  }, [categery])

  return wallpaper ? (
    <div className="w-screen h-screen flex bg-[#1F1E24] text-white overflow-x-hidden ">
      <Sidenav />
      <div className="w-[100%]  xl:ml-[20%] lg:ml-[20%]  md:ml-[20%] md:w-[80%] sm:ml-[1.5%] sm:max-w-[100%]  mt-12">
        <Topnav />
        <Header data={wallpaper} />
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-zinc-300 p-5 text-2xl">Trending</h1>
          <Dropdown title={"filter"} options={['movie', "tv", 'all']} onoptionChange={setCategery} />

        </div>
        <HorizontalCard title='movie' data={trending} />
      </div>
    </div>
  ) : <Loader />;
}

export default Home;
