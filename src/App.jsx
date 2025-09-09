import { Routes, Route, } from 'react-router-dom'
import Home from './pages/Home';
import Trending from './pages/Trending';
import Popular from './pages/Popular';
import Movies from './pages/Movies';
import Tv from './pages/Tv-shows';
import People from './pages/People';
import MovieDetails from './pages/subPage/MovieDetails';
import TvDetails from './pages/subPage/TvDetails'
import PersonDetails from './pages/subPage/PersonDetails'
import Trailer from './component/Trailer';
import Page404 from './component/Page404';
import SeasonPage from './pages/subPage/seasonPage';
import ContactUs from './pages/ContactUs';

const App = () => {
  return (
    <div className="w-screen h-screen bg-[#1F1E24] text-white">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movie' element={<Movies />} />
        <Route path='/movie/details/:id' element={<MovieDetails />} >
          <Route path='/movie/details/:id/trailer' element={<Trailer />} />

        </Route>

        <Route path='/tv' element={<Tv />} />
        <Route path='/tv/details/:id' element={<TvDetails />} >
          <Route path='/tv/details/:id/trailer' element={<Trailer />} />
        </Route>
        <Route path='/tv/:id/season/:seasosd' element={<SeasonPage />} />

        <Route path='/people' element={<People />} />
        <Route path='/person/details/:id' element={<PersonDetails />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='*' element={<Page404 />} />



      </Routes>
    </div>
  );
}

export default App;
