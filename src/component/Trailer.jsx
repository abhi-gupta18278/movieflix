import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';
import Page404 from '../component/Page404.jsx'

const Trailer = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const category = pathname.includes('movie') ? 'movie' : "tv"

  const ytVideo = useSelector((state) => state[category]?.info?.videos)


  // console.log(pathname)


  return ytVideo ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black/80">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4   right-4 sm:top-6 sm:right-6 text-3xl sm:text-4xl text-zinc-300 hover:text-red-600 transition-colors"
        aria-label="Close trailer"
      >
        <i className="ri-close-large-line"></i>
      </button>
      <div className="w-full max-w-[90vw] sm:max-w-[80vw] lg:max-w-[60vw] aspect-video mx-auto">
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${ytVideo.key}`}
          controls
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: { modestbranding: 1, rel: 0 },
            },
          }}
        />
      </div>
    </div>

  ) : <Page404 />;
}

export default Trailer;
