import { Link } from "react-router-dom";
import RatingCircle from "./RatingCircle";

const Card = ({ data, title }) => {
  return (
    <div className=" w-screen flex flex-wrap justify-start  gap-8 p-6 h-screen">
      {data.map((card, i) => (
        < Link key={i} to={`/${card.media_type || title}/details/${card.id}`}>


          <div
            className="w-[200px] rounded-2xl relative bg-zinc-900 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <img
              className="h-[280px] w-full object-cover rounded-t-2xl"
              src={(card.poster_path || card.backdrop_path || card.profile_path)?`https://image.tmdb.org/t/p/original${card.poster_path || card.backdrop_path || card.profile_path
                }`: '/No_Image.jpg' }
              alt={card.title || card.name}
            />
            <div className="p-3">
              <h1 className="font-semibold text-sm text-white truncate">
                {card.name ||
                  card.title ||
                  card.original_name ||
                  card.original_title}
              </h1>

            </div>
            {card.vote_average && <div className="absolute bottom-10 right-[-9%] flex items-center justify-center rounded-full shadow-md">
              <RatingCircle percent={(card.vote_average * 10).toFixed()} />
            </div>}



          </div>
        </Link>
      ))
      }
    </div >

  );
};

export default Card;
