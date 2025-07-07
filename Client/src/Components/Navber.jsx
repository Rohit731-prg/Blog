import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

function Navber() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 1, name: "Home", link: `/profile/${user?._id}` },
    { id: 2, name: "Profile", link: `/account/${user?._id}` },
    { id: 3, name: "My Blogs", link: `/blogs/${user?._id}` },
  ];

  const logout = () => {
    useUserStore.getState().logOut();
    navigate("/");
  };

  const logo = "https://cdn-icons-png.flaticon.com/128/956/956039.png";
  console.log(user);
  return (
    <div className="w-full fixed top-0 left-0 z-50 py-5 px-6 md:px-20 flex items-center justify-between bg-white shadow-sm">
      {/* Left section */}
      <section className="flex items-center gap-3">
        <img src={logo} className="w-10 object-cover rounded-full" />
        <div className="hidden sm:flex items-center gap-2 border-b-2 border-black px-2">
          <IoMdSearch />
          <input
            type="text"
            className="outline-none bg-transparent"
            placeholder="Search Blogs Name"
          />
        </div>
      </section>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.link)}
            className="text-gray-800 hover:text-blue-600"
          >
            {item.name}
          </button>
        ))}
        <img src={user?.image} alt="iamge" className="w-10 rounded-full h-10" />
        <button
          onClick={logout}
          type="submit"
          className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-red-500 backdrop-blur-md lg:font-semibold isolation-auto border-red-300 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
        >
          Log Out
          <svg
            className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
            viewBox="0 0 16 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
              className="fill-gray-800 group-hover:fill-gray-800"
            ></path>
          </svg>
        </button>
      </nav>

      {/* Mobile menu button */}
      <div className="md:hidden z-50">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile nav menu */}
      {isOpen && (
        <div className="absolute top-16 right-4 w-60 bg-white rounded-md shadow-md flex flex-col gap-4 p-4 md:hidden z-40">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="text-gray-800 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}

          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Navber;
