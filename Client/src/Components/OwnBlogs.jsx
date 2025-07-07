import React, { useEffect } from "react";
import Navber from "./Navber";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import usePostStore from "../store/postStore";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

function OwnBlogs() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const posts = usePostStore((state) => state.posts);

  useEffect(() => {
    usePostStore.getState().getPostByID();
  }, []);

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-gray-800 font-primary">
      <Navber />
      <Toaster />

      <header className="pt-32 px-6 md:px-20 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-semibold">Your Posts</h1>
        <button
          onClick={() => navigate(`/account/${user._id}`)}
          className="px-5 py-2 rounded-full bg-gray-800 text-white font-semibold active:bg-gray-600"
        >
          New Post
        </button>
      </header>

      <section className="my-10 px-6 md:px-10">
        {!posts ? (
          <div className="text-center text-gray-500">Loading your posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500">No posts yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {posts.map((post) => (
              <div key={post._id} className="bg-white shadow rounded overflow-hidden">
                <img
                  src={post.image}
                  alt="post"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h2 className="font-semibold text-lg truncate">{post.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm mt-2">
                    <span className="bg-gray-200 px-3 py-1 rounded-full">{post.type}</span>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                      Likes: {post.likes}
                    </span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <button
                      // onClick={() => navigate(`/edit/${post._id}`)}
                      className="flex items-center gap-1 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                    >
                      <FaRegEdit /> Edit
                    </button>
                    <button
                      onClick={() => usePostStore.getState().deletePost(post._id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      <MdDelete /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default OwnBlogs;
