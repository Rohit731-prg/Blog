import useUserStore from "../../store/userStore";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const { user, logOut } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarList = [
    { id: 1, name: "Home", link: "/home" },
    { id: 2, name: "Own Blogs", link: "/my-posts" },
    { id: 3, name: "Save Posts", link: "/save" },
    { id: 4, name: "Account", link: "/account" },
  ];

  const handelLogout = () => {
    logOut();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-72 px-6 min-h-screen fixed left-0 top-0 flex flex-col justify-between py-5 bg-gray-100 shadow-xl">
      <div>
        <section className="flex flex-row gap-3 border-b-2 border-gray-500 pb-5 mb-10">
          <img
            src={user?.image}
            alt=""
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="mt-1">
            <p className="font-medium">{user?.name}</p>
            <p className="text-[10px] text-gray-500">{user?.email}</p>
          </div>
        </section>

        <section className="flex flex-col gap-1">
          {sidebarList.map((list) => (
            <button
              key={list.id}
              onClick={() => navigate(list.link)}
              className={`text-lg font-normal py-2 rounded-lg transition ${
                isActive(list.link)
                  ? "bg-gray-600 text-white"
                  : "hover:bg-gray-400"
              }`}
            >
              {list.name}
            </button>
          ))}
        </section>
      </div>

      <section className="border-t-2 border-gray-500">
        <button
          onClick={() => navigate("/new-post")}
          className={`w-full py-3 px-5 rounded-lg mb-2 mt-5 transition ${
            isActive("/new-post")
              ? "bg-blue-600 text-white"
              : "bg-blue-300 text-blue-600 hover:bg-blue-600 hover:text-white"
          }`}
        >
          Post New
        </button>

        <button
          className="w-full bg-red-300 py-3 px-5 rounded-lg text-red-600"
          onClick={handelLogout}
        >
          LOGOUT
        </button>
      </section>
    </aside>
  );
}

export default Sidebar;
