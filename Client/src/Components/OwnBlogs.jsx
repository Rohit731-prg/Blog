import React, { useEffect, useState } from "react";
import Sidebar from "./Auth/Sidebar";
import useUserStore from "../store/userStore";
import usePostStore from "../store/postStore";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const categories = [
  "Technology",
  "Politics",
  "Business & Finance",
  "Lifestyle",
  "Culture & Society",
];

function OwnBlogs() {
  const [postDetails, setPostDetails] = useState(null);
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { posts, getPostByID, deletePost, updatePost } = usePostStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filterPosts = (posts || []).filter((post) =>
    post?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const hendelDelete = async (id) => {
    const res = await swal.fire({
      title: "Are You Sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (res.isConfirmed) await deletePost(id);
  };
  let subtitle;
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  const handelEdit = async (post) => {
    setPostDetails(post);
    setIsModalOpen(true);
  };

  const handelEditSubmit = async (e) => {
    e.preventDefault();
    const res = await swal.fire({
      title: "Are You Sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    });
    if (res.isConfirmed) await updatePost(postDetails);
    setIsModalOpen(false);
    setPostDetails(null);
  };

  useEffect(() => {
    if (user) getPostByID();
  }, []);

  return (
    <main className="min-h-screen bg-[#f9f9f9] text-gray-800 font-primary flex flex-row">
      <Sidebar />
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 50,
          },
          content: {
            inset: "50% auto auto 50%",
            transform: "translate(-50%, -50%)",
            padding: "0",
            border: "none",
            borderRadius: "12px",
            maxWidth: "420px",
            width: "100%",
          },
        }}
        contentLabel="Update Post"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Update Post</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handelEditSubmit}
          className="flex flex-col gap-4 px-6 py-5"
        >
          <input
            type="text"
            value={postDetails?.title}
            onChange={(e) =>
              setPostDetails({ ...postDetails, title: e.target.value })
            }
            placeholder="Post title"
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            rows={4}
            value={postDetails?.description}
            onChange={(e) =>
              setPostDetails({ ...postDetails, description: e.target.value })
            }
            placeholder="Post description..."
            className="p-3 rounded-md border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={postDetails?.type}
            onChange={(e) =>
              setPostDetails({ ...postDetails, type: e.target.value })
            }
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select category</option>
            {categories.map((cate, index) => (
              <option key={index} value={cate}>
                {cate}
              </option>
            ))}
          </select>

          {/* Footer */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Update
            </button>
          </div>
        </form>
      </Modal>

      <section className="my-10 px-6 md:px-10 ml-72">
        <h1 className="text-lg ">Explore Your Own Posts here {user?.name}</h1>
        <div className="flex flex-row justify-between my-5">
          <input
            placeholder="Search your post with name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-gray-400 rounded-full px-5 w-1/3"
            type="text"
          />
          <button
            className="px-10 py-2 rounded-full bg-purple-800 text-white"
            onClick={() => navigate("/new-post")}
          >
            Add new Post +
          </button>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {filterPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow rounded overflow-hidden"
            >
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
                  <span className="bg-gray-200 px-3 py-1 rounded-full">
                    {post.type}
                  </span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                    Likes: {post.likes.length}
                  </span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                    Views: {post.reads.length}
                  </span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                    Comments: {post.comment}
                  </span>
                </div>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => handelEdit(post)}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                  >
                    <FaRegEdit /> Edit
                  </button>
                  <button
                    onClick={() => hendelDelete(post._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    <MdDelete /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Toaster />
    </main>
  );
}

export default OwnBlogs;
