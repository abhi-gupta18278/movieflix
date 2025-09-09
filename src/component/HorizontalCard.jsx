import { Link } from "react-router-dom";



const HorizontalCard = ({ data, title }) => {

  return data ? (
    <div className="w-full p-4">
      <div className="flex overflow-x-auto  mt-3 gap-5 ">
        {data.map((d, i) => (
          <Link key={i} to={`/${d.media_type || title}/details/${d.id}`}>
            <div

              className="min-w-[250px] max-w-[250px]  mb-5 rounded-md bg-zinc-900 "
            >
              <img
                className="h-[150px]  w-full object-cover rounded-t-md"
                src={(d.backdrop_path || d.poster_path || d.profile_path) ? `https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path || d.profile_path
                  }` : '/No_Image.jpg'}
                alt={d.title || d.name}
              />
              <h1 className="font-semibold text-base p-2 truncate">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p className="min-h-[60px] text-sm px-2 overflow-hidden">
                {d.overview
                  ? d.overview.slice(0, 60)
                  : "No description available"} <span className="text-blue-500 cursor-pointer">...more</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div >
  ) : <h1>No Record Found</h1>;
};

export default HorizontalCard;
