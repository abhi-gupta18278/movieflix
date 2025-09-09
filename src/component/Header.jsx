import { Link } from "react-router-dom";
import Loader from "./Loader";

const Header = ({ data }) => {

  const bgImage = `linear-gradient(
    rgba(0,0,0,0.3), 
    rgba(0,0,0,0.6), 
    rgba(0,0,0,0.8)
  ), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path
    })`;

  return data ? (
    <div
      style={{
        backgroundImage: bgImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

      }}
      className="w-full  h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-end mt-12 md:mt-8 lg:mt-4"
    >
      <div className="p-4 sm:p-6 md:p-10 max-w-[80%] sm:max-w-[90%] md:max-w-[90%]">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-black text-white leading-snug">
          {data.name ||
            data.title ||
            data.original_name ||
            data.original_title}
        </h1>

        {/* Overview */}
        {data.overview && (
          <p className="mt-3 mb-3 text-white text-sm sm:text-base md:text-lg leading-relaxed">
            {data.overview.slice(0, 200)}...
            <Link
              to={`/${data.media_type}/details/${data.id}`}
              className="text-blue-400 ml-1"
            >
              more
            </Link>
          </p>
        )}

        {/* Info row */}
        <p className="text-white text-xs sm:text-sm md:text-base flex flex-wrap gap-3 items-center">
          <span>
            <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
            {data.release_date || "No Information"}
          </span>
          <span>
            <i className="text-yellow-500 ri-album-fill"></i>{" "}
            {data.media_type?.toUpperCase()}
          </span>
        </p>

        {/* CTA Button */}
        <Link
          to={`/${data.media_type}/details/${data.id}/trailer`}
          className="bg-[#6556CD] px-4 py-2 sm:px-6 sm:py-3 mt-4 inline-block rounded text-white font-semibold text-sm sm:text-base md:text-lg transition hover:bg-[#4b3cae]"
        >
          Watch Trailer
        </Link>
      </div>
    </div>
  ) : <Loader />;
};

export default Header;
