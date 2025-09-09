import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncloadPerson, removePerson } from "../../store/actions/peopleActions";
import Loader from "../../component/Loader";
import Dropdown from '../../component/Dropdown'

const PersonDetails = () => {
  const navigate = useNavigate();
  let [category, setcategory] = useState('movie');
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.people);
  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncloadPerson(id));
    return () => {
      dispatch(removePerson());
    };
  }, [id]);


  return info ? (
    <div className="w-full min-h-screen bg-zinc-900 text-white px-6 py-4">
      {/* Back Button */}
      <i
        onClick={() => navigate(-1)}
        className="ri-arrow-left-line cursor-pointer text-4xl text-zinc-300 hover:text-blue-600 mb-6"
      ></i>

      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT COLUMN */}
        <div className="md:w-[30%]">
          {/* Profile Image */}
          <img
            className="w-full rounded-xl shadow-lg object-cover"
            src={(info.detail?.profile_path) ? `https://image.tmdb.org/t/p/original${info.detail?.profile_path}` : '/No_Image.jpg'}
            alt={info.detail?.name}
          />

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-4 text-zinc-300 text-3xl">
            {info.externalid?.instagram_id && (
              <a
                target="_blank"
                href={`https://www.instagram.com/${info.externalid?.instagram_id}`}
                rel="noreferrer"
                className="hover:text-pink-500"
              >
                <i className="ri-instagram-line"></i>
              </a>
            )}
            {info.externalid?.facebook_id && (
              <a
                target="_blank"
                href={`https://www.facebook.com/${info.externalid?.facebook_id}`}
                rel="noreferrer"
                className="hover:text-blue-500"
              >
                <i className="ri-facebook-box-fill"></i>
              </a>
            )}
            {info.externalid?.wikidata_id && (
              <a
                target="_blank"
                href={`https://www.wikidata.org/wiki/${info.externalid?.wikidata_id}`}
                rel="noreferrer"
                className="hover:text-green-400"
              >
                <i className="ri-earth-fill"></i>
              </a>
            )}
            {info.externalid?.tiktok_id && (
              <a
                target="_blank"
                href={`https://www.tiktok.com/@${info.externalid?.tiktok_id}`}
                rel="noreferrer"
                className="hover:text-purple-400"
              >
                <i className="ri-tiktok-fill"></i>
              </a>
            )}
          </div>

          {/* Personal Info */}
          <div className="mt-6 bg-zinc-900 p-5 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold border-b border-gray-700 pb-3 mb-4">
              Personal Info
            </h1>
            <div className="mb-4">
              <p className="text-sm text-gray-400 uppercase">Known For</p>
              <p className="text-lg font-medium">{info.detail?.
                known_for_department || "N/A"}</p>
            </div>
            {/* Birthday */}
            <div className="mb-4">
              <p className="text-sm text-gray-400 uppercase">Birthday</p>
              <p className="text-lg font-medium">
                {info.detail.birthday || "N/A"}{" "}
                {info.detail.age && (
                  <span className="text-gray-400 text-base">
                    ({info.detail.age} years old)
                  </span>
                )}
              </p>
            </div>

            {/* Deathday */}
            <div className="mb-4">
              <p className="text-sm text-gray-400 uppercase">Deathday</p>
              <p className="text-lg font-medium">
                {info.detail.deathday ? info.detail.deathday : "Still Alive"}
              </p>
            </div>

            {/* Place of Birth */}
            <div className="mb-4">
              <p className="text-sm text-gray-400 uppercase">Place of Birth</p>
              <p className="text-lg font-medium">
                {info.detail.place_of_birth || "N/A"}
              </p>
            </div>

            {/* Also Known As */}
            <div>
              <p className="text-sm text-gray-400 uppercase">Also Known As</p>
              <div className="space-y-1">
                {info.detail.also_known_as?.length > 0 ? (
                  info.detail.also_known_as.map((name, index) => (
                    <p key={index} className="text-lg font-medium">
                      {name}
                    </p>
                  ))
                ) : (
                  <p className="text-lg font-medium">N/A</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}

        <div className="md:w-[70%]">
          {/* Name */}
          <h1 className="text-4xl font-bold">{info.detail?.name}</h1>

          {/* Biography */}
          <h2 className="text-2xl font-bold mt-5">Biography</h2>
          <p className="mt-2 text-gray-300 leading-relaxed w-[90%]">
            {info.detail?.biography?.slice(0, 400)}
            {info.detail?.biography &&
              info.detail?.biography.length > 400 && (
                <Link
                  to="#"
                  className="text-blue-400 font-medium ml-1 hover:underline"
                >
                  ...Read More →
                </Link>
              )}
          </p>

          {/* Known For Section */}
          <h2 className="mt-6 text-xl font-semibold">Known For</h2>
          {info.combinedCredits?.cast?.length > 0 && (
            <div className="flex overflow-x-auto gap-6 py-6 scrollbar-thin scrollbar-thumb-zinc-700">
              {info.combinedCredits.cast.map((castmovie, idx) => (

                <Link key={idx} to={`/${castmovie.media_type || category}/details/${castmovie.id}`}>


                  <div

                    className="min-w-[200px] rounded-2xl bg-zinc-900 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 cursor-pointer"
                  >
                    <img
                      className="h-[280px] w-full object-cover rounded-t-2xl"
                      src={castmovie.poster_path ? `https://image.tmdb.org/t/p/original${castmovie.poster_path}` : 'No_Image.jpg'}
                      alt={castmovie.title || castmovie.name}
                    />
                    <div className="p-3">
                      <h1 className="font-semibold text-sm text-white truncate">
                        {castmovie.title || castmovie.name}
                      </h1>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="h-[80vh] w-[60vw] bg-zinc-900 rounded-xl shadow-lg p-6">
            {/* Header */}
            <div className="flex justify-between flex-wrap items-center border-b  mt-2 border-zinc-700 pb-3 mb-4">
              <h1 className="font-semibold text-2xl text-white">Acting</h1>
              <Dropdown
                title="Department"
                options={["tv", "movie"]}
                onoptionChange={setcategory}
              />
            </div>

            {/* Credits List */}
            <div className="w-full h-[70vh] overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
              {(info[category + "Credits"]?.cast).length === 0 ? (category = "tv") : (category = "movie")}
              {info[category + "Credits"]?.cast?.map((c, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 sm:gap-6 py-3 sm:py-4 px-3 sm:px-4 border-b border-zinc-800 hover:bg-zinc-800/40 rounded-lg transition duration-200"
                >
                  {/* Year */}
                  <div className="text-gray-400 font-medium min-w-[40px] sm:min-w-[50px] text-sm sm:text-base">
                    {c.release_date?.slice(0, 4) || c.first_air_date?.slice(0, 4) || "—"}
                  </div>

                  {/* Circle indicator */}
                  <div className="text-gray-400 text-sm sm:text-base">○</div>

                  {/* Title & Role */}
                  <div className="flex flex-col flex-1">
                    <Link
                      to={`/${category}/details/${c.id}`}
                      className="text-base sm:text-lg font-semibold text-white hover:text-blue-400 line-clamp-1"
                    >
                      {c.name || c.title || c.original_name || c.original_title}
                    </Link>

                    {c.episode_count && (
                      <span className="text-xs sm:text-sm text-blue-400 hover:underline">
                        {`${c.episode_count} episode${c.episode_count > 1 ? "s" : ""}`}
                      </span>
                    )}

                    {c.character && (
                      <span className="text-xs sm:text-sm text-gray-400">
                        as <span className="italic">{c.character}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  ) : <Loader />;
};

export default PersonDetails;
