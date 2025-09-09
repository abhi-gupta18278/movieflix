import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { asyncloadmovie, removeMovie } from '../../store/actions/Movieaction';
import Loader from '../../component/Loader';
import RatingCircle from '../../component/RatingCircle';
import HorizontalCard from '../../component/HorizontalCard';




const MovieDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { info } = useSelector((state) => state.movie)

  useEffect(() => {
    dispatch(asyncloadmovie(id))

    return (() => {

      dispatch(removeMovie())
    })

  }, [id])

  return info ? (
    <div className="h-full min-h-screen w-screen text-white bg-zinc-900">
      <div
        className="min-h-screen w-screen relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${info.detail?.backdrop_path || info.detail?.profile_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90"></div>

        <nav className="absolute top-4 left-4 flex items-center gap-4 z-[100]">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line cursor-pointer text-4xl text-zinc-300 hover:text-blue-600"
          ></i>

          {info.detail?.homepage && (
            <a target="_blank" href={info.detail.homepage}>
              <i className="ri-external-link-fill text-4xl ml-2"></i>
            </a>
          )}

          {info.externalid?.wikidata_id && (
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill text-4xl ml-2"></i>
            </a>
          )}

          {info.externalid?.imdb_id && (
            <a
              target="_blank"
              href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
            >
              <i className="ri-movie-line text-4xl ml-2"></i>
            </a>
          )}
        </nav>

        {/* Main content */}
        <div className="relative z-10 flex flex-col lg:flex-row px-4 sm:px-10 lg:px-20 pt-20 gap-8 lg:gap-12">
          {/* Left Poster */}
          <div className="w-full h-full sm:w-2/3 lg:w-1/3 md:w-1/3 mx-auto lg:mx-0">
            <img
              className="h-[80vh] sm:h-[70vh] w-full object-cover rounded-xl shadow-lg hover:opacity-80 transition"
              src={
                info.detail?.poster_path
                  ? `https://image.tmdb.org/t/p/original${info.detail.poster_path}`
                  : '/No_Image.jpg'
              }
              alt={info.detail?.title || info.detail?.name}
            />


            {info.watchproviders?.flatrate && (
              <div className="bg-red-600 rounded-xl flex items-center gap-3 mt-4 px-4 py-3 md:text-sm sm:text-xl shadow-md w-full">
                <img
                  className="h-10 w-10 rounded-lg object-cover"
                  src={`https://image.tmdb.org/t/p/original${info.watchproviders.flatrate[0]?.logo_path}`}
                  alt="Provider"
                />
                <div>
                  <h4 className="text-lg font-bold">Now Streaming</h4>
                  <p className="text-sm sm:text-base text-gray-200">
                    {info.watchproviders.flatrate
                      .map((el) => el.provider_name)
                      .join(", ")}
                  </p>
                </div>
              </div>
            )}
          </div>


          <div className="w-full lg:w-2/3 flex flex-col justify-start">

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              {info.detail?.title || info.detail?.name}{" "}
              <span className="text-gray-400 text-lg sm:text-xl lg:text-2xl">
                ({info.detail?.release_date?.split("-")[0]})
              </span>
            </h1>


            <p className="text-gray-300 mt-2 text-sm sm:text-base lg:text-lg">
              {info.detail?.release_date} •{" "}
              {info.detail?.genres?.map((g) => g.name).join(", ")} •{" "}
              {Math.floor(info.detail?.runtime / 60)}h{" "}
              {info.detail?.runtime % 60}m
            </p>


            <div className="flex items-center gap-4 mt-4">
              <RatingCircle
                percent={Math.round(info.detail?.vote_average * 10)}
              />
              <span className="font-bold">User Score</span>
            </div>


            <Link
              to={`/movie/details/${info.detail?.id}/trailer`}
              className="bg-blue-600 mt-4 w-fit px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              ▶ Play Trailer
            </Link>

            {info.detail?.tagline && (
              <p className="italic text-gray-400 mt-5 text-base sm:text-lg">
                "{info.detail.tagline}"
              </p>
            )}


            <h2 className="text-xl sm:text-2xl font-bold mt-6 mb-2">Overview</h2>
            <p className="text-gray-200 leading-relaxed text-sm sm:text-base lg:text-lg line-clamp-5 lg:line-clamp-none max-h-[200px] lg:max-h-none overflow-y-auto pr-2">
              {info.detail?.overview}
            </p>


            {info.detail?.credits?.crew && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                {info.detail.credits.crew.slice(0, 4).map((crew) => (
                  <div key={crew.id}>
                    <h3 className="font-bold">{crew.name}</h3>
                    <p className="text-sm text-gray-400">{crew.job}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div >


      < div className="w-screen min-h-[60vh] px-4 sm:px-8 lg:px-16 py-10 bg-zinc-950" >
        <h1 className="font-black text-2xl sm:text-3xl mb-6">
          Recommended Movies
        </h1>
        <HorizontalCard
          title="movie"
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
      </div >

      <Outlet />
    </div >
  ) : (
    <Loader />
  );


}

export default MovieDetails;
