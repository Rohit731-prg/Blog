import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Auth/Sidebar";
import useUserStore from "../store/userStore";
import { FiSearch } from "react-icons/fi";
import { GrLike } from "react-icons/gr";
import { FaRegComment, FaRegEye } from "react-icons/fa";

function Profile() {
  const { getPosts, getTranding, getCategoeyPost, posts, tranding, setPost } = usePostStore();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const categories = [
    "All", "Technology", "Politics", "Business & Finance", "Lifestyle", "Culture & Society",
  ];

  const setCategory = async (category) => {
    await getCategoeyPost(category);
  };

  const fetchData = async () => {
    await Promise.all([getPosts(), getTranding()]);
  };

  const [search, setSearch] = useState("");
  const filterPosts = (posts || []).filter((post) => {
    return post.title.toLowerCase().includes(search.toLowerCase());
  });

  const navigateToBlog = (post) => {
    setPost(post);
    navigate("/blog");
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <main className="min-h-screen bg-[#f9f9f9] text-gray-800 font-primary flex flex-row">
        <Sidebar />

        <section className="flex flex-row w-full pt-16 px-20 gap-8 ml-72">
          {/* Left Section - Posts */}
          <section className="w-2/3 space-y-6 px-10">
            <section>
                <p className="text-gray-400">Welcome back <span className="text-black">{user?.name.split(" ")[0]}</span></p>
                <div className="my-5 bg-gray-300 px-5 py-2 flex flex-row gap-3 items-center rounded-full">
                  <FiSearch />
                  <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search you blog here .."
                  className="w-full border-none outline-none"
                  type="text" />
                </div>
            </section>
            <p className="text-4xl font-semibold mb-10">Latest Blogs for You</p>
            {posts &&
              filterPosts.map((post, index) => (
                <div
                  key={index}
                  onClick={() => navigateToBlog(post)}
                  className="flex flex-row h-48 mb-14 cursor-pointer"
                >
                  <section className="w-2/3">
                    <div className="flex flex-row items-start gap-3 mb-3">
                      <img
                        src={post.user.image}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-[17px] font-semibold text-blue-400">
                          {post.user.name}
                        </p>
                        <p className="text-[12px] font-semibold">
                          {new Date(post.createdAt).toLocaleDateString(
                            "en-GB",
                            { day: "2-digit", month: "long" }
                          )}
                        </p>
                      </div>
                    </div>
                    <p className="text-xl font-semibold">{post.title.length > 30 ? post.title.slice(0, 30)  + "..." : post.title}</p>
                    <p className="my-3 text-sm text-gray-400">
                      {post.description.length > 120
                        ? `${post.description.slice(0, 120)}...`
                        : post.description}
                    </p>

                    <div className="mt-1 flex flex-row gap-5 items-center">
                      <p className="text-white bg-gray-600 inline-block px-3 py-1 rounded-full">
                        {post.type}
                      </p>
                      <p className="flex flex-row gap-1 items-center bg-amber-200 px-2 py-1 rounded-full"><FaRegEye />{post.reads.length}</p>
                      <p className="flex flex-row gap-1 items-center bg-blue-200 px-2 py-1 rounded-full"><GrLike />{post.likes.length}</p>
                      <p className="flex flex-row gap-1 items-center bg-black text-white px-2 py-1 rounded-full"><FaRegComment />{post.comment}</p>

                    </div>
                  </section>
                  <section className="w-1/3">
                    <img
                      src={post.image}
                      alt=""
                      className="w-full object-cover bg-gray-400 h-full rounded-xl"
                    />
                  </section>
                </div>
              ))}
          </section>

          {/* Right Section - Sidebar */}
          <section className="w-1/3 h-screen sticky top-24 space-y-8 overflow-y-auto">
            {/* Categories */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Browse Categories</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat, i) => (
                  <button
                    onClick={() => setCategory(cat)}
                    key={i}
                    className="px-3 py-1.5 bg-gray-700 text-white rounded-full text-sm hover:bg-gray-800 transition"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Blogs */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Trending Blogs</h2>
              <section className="space-y-4">
                {tranding &&
                  tranding.slice(0, 5).map((blog, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start border-b pb-3 border-gray-200"
                    >
                      <span className="text-2xl font-bold text-gray-300">
                        0{i + 1}
                      </span>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <img
                            src={blog.user.image}
                            alt="user"
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <p className="text-xs text-gray-600">
                            {blog.user.name}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-800 leading-snug">
                          {blog.title}
                        </p>
                      </div>
                    </div>
                  ))}
              </section>
            </div>
          </section>
        </section>
      </main>
      <Toaster />
    </>
  );
}

export default Profile;
