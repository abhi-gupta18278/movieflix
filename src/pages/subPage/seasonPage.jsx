import { useNavigate } from "react-router-dom";

const SeasonPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-center px-4">
      {/* Emoji or Icon */}
      <div className="text-6xl mb-4">😔</div>

      {/* Message */}
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
        Sorry for the Inconvenience
      </h1>
      <p className="text-gray-400 text-sm sm:text-base mb-6 max-w-md">
        We couldn’t load this season’s details right now.
        Please try again later or go back to the previous page.
      </p>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
      >
        ⬅ Back
      </button>
    </div>
  );
};

export default SeasonPage;
