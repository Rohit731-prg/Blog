import React, { useEffect } from "react";
import Navber from "./Navber";
import useUserStore from "../store/userStore";
import usePostStore from "../store/postStore";
import { FcLike } from "react-icons/fc";
import { Toaster } from "react-hot-toast";
import useLikeStore from "../store/likeStore";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const posts = usePostStore((state) => state.posts);
  const trandings = usePostStore((state) => state.tranding);
  const categories = [
    "All",
    "Technology",
    "Politics",
    "Business & Finance",
    "Lifestyle",
    "Culture & Society",
  ];

  const setCategory = async (category) => {
    await usePostStore.getState().getCategoeyPost(category);
  };

  useEffect(() => {
    const fetchData = async () => {
      const postStore = usePostStore.getState();
      await Promise.all([postStore.getPosts(), postStore.getTranding()]);
    };
    fetchData();
  }, []);

  return (
    <>
      {user && (
        <main className="min-h-screen bg-[#f9f9f9] text-gray-800 font-primary">
          <Navber />

          <section className="flex flex-row w-full pt-40 px-20 gap-8">
            {/* Left Section - Posts */}
            <section className="w-2/3 space-y-6 px-10">
              <p className="text-4xl font-semibold mb-10">For you</p>
              {posts &&
                posts.map((post, index) => (
                  <div 
                  key={index} 
                  onClick={() => navigate(`/blog/${post._id}`)}
                  className="flex flex-row h-48 mb-14 cursor-pointer">
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
                      <p className="text-xl font-semibold">{post.title}</p>
                      <p className="my-3 text-sm text-gray-400">{post.description.length > 120 ? `${post.description.slice(0, 120)}...` : post.description}</p>

                      <div className="mt-1 flex flex-row gap-2 items-center">
                        <p className="text-white bg-gray-600 inline-block px-3 py-1 rounded-full">{post.type}</p>
                        <button 
                        onClick={() => useLikeStore.getState().addLike(post._id)}
                        className="flex flex-row items-center px-3 py-1 bg-red-300 rounded-sm hover:bg-red-400 transition">
                          <FcLike />{post.likes}
                        </button>
                      </div>
                    </section>
                    <section className="w-1/3">
                      <img src={post.image} alt="" className="w-full object-cover bg-gray-400 h-full rounded-xl" />
                    </section>
                  </div>
                ))}
            </section>

            {/* Right Section - Sidebar */}
            <section className="w-1/3 h-screen sticky top-24 space-y-8 overflow-y-auto">
              {/* Categories */}
              <div>
                <h2 className="text-xl font-semibold mb-3">
                  Browse Categories
                </h2>
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
                  {trandings &&
                    trandings.slice(0, 5).map((blog, i) => (
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
      )}
      <Toaster />
    </>
  );
}

export default Profile;
