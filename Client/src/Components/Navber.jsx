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
    { id: 3, name: "My Blogs", link: "/myBlogs" },
  ];

  const logout = () => {
    useUserStore.getState().logOut();
    navigate("/");
  }

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
          className="bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Log Out
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
