import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidenav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: "/trending", label: "Trending", icon: "ri-fire-fill" },
    { to: "/popular", label: "Popular", icon: "ri-bar-chart-fill" },
    { to: "/movie", label: "Movies", icon: "ri-movie-2-fill" },
    { to: "/tv", label: "TV Shows", icon: "ri-tv-fill" },
    { to: "/people", label: "People", icon: "ri-user-3-fill" },
  ];

  const infoItems = [
    { to: "/contact", label: "Contact Us", icon: "ri-phone-fill" },
  ];

  return (
    <div className="flex">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden  md:hidden fixed top-4 left-4 z-50 bg-[#6556cd] text-white p-2 rounded-md"
        onClick={() => setOpen(!open)}
      >
        <i className="ri-menu-line text-xl"></i>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#181818] border-r-2 p-5 z-40 md:pl-0
        transform ${open ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 md:translate-x-0 transition-transform duration-300 w-[75%] sm:w-[60%] md:w-[20%] lg:w-[20%]`}
      >
        {/* Logo */}
        <h1 className="flex items-center justify-center gap-2 text-[#6556cd] text-2xl font-bold mb-8">
          <i className="ri-tv-fill"></i> MovieFlix
        </h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-200 
                ${location.pathname === item.to
                  ? "bg-[#6556cd] text-white"
                  : "bg-[#212121] text-gray-300 hover:bg-[#6556cd] hover:text-white"
                }`}
            >
              <i className={item.icon}></i> {item.label}
            </Link>
          ))}

          <hr className="my-5 border-gray-600" />
          <h2 className="opacity-70 px-5 mb-2  sm:text-sm lg:text-lg md:text-sm">Website Information</h2>
          <a target="_blank" href="http://abhi-webportfolio.onrender.com/"

            className="flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-200 bg-[#212121] text-gray-300 hover:bg-[#6556cd] hover:text-white"
          >
            <i className="ri-information-fill"></i> About Us
          </a>

          {infoItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-200 bg-[#212121] text-gray-300 hover:bg-[#6556cd] hover:text-white"
            >
              <i className={item.icon}></i> {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidenav;
