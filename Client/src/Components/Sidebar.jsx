import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

function Sidebar() {
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
    <aside className="px-10 ">
      
    </aside>
  );
}

export default Sidebar;
