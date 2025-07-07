import React, { useState, useEffect } from "react";
import useUserStore from "../store/userStore";
import usePostStore from "../store/postStore";
import Navber from "./Navber";
import { FaCamera } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

function Account() {
  const postCount = useUserStore((state) => state.post);
  const user = useUserStore((state) => state.user);
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const [post, setPost] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  });

  const categories = [
    "Technology",
    "Politics",
    "Business & Finance",
    "Lifestyle",
    "Culture & Society",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64IMG = reader.result;
      setBase64(base64IMG);
      setPost((prev) => ({ ...prev, image: base64IMG }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await usePostStore.getState().cratePost(post, base64);
    setPost({ title: "", description: "", category: "", image: "" });
  };

  return (
    <>
      {user && (
        <main className="min-h-screen bg-gray-50 pt-30 font-primary">
          <Navber />

          <section className="px-52 flex flex-row gap-5">
            <section className="w-1/3 flex flex-col ">
              <img
                src={user.image}
                className="w-40 h-40 mt-20 mb-2 rounded-full"
              />
              <p className="font-semibold text-4xl">{user.name}</p>
              <p className="text-gray-600 font-semibold mt-2">{user.email}</p>

              <p>Post : {postCount}</p>
            </section>

            <section className="mt-5 w-2/3">
              <p className="font-semibold text-4xl">Create Post</p>

              <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="title">Title</label>
                <input
                  className="rounded-sm bg-white border border-gray-400 p-2 mb-2 outline-none focus:ring-2 focus:ring-blue-400"
                  value={post.title}
                  onChange={(e) =>
                    setPost((prev) => ({ ...prev, title: e.target.value }))
                  }
                  id="title"
                  placeholder="Enter Title"
                  type="text"
                />

                <label htmlFor="description">Description</label>
                <textarea
                  value={post.description}
                  onChange={(e) =>
                    setPost((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="h-40 rounded-sm bg-white border border-gray-400 p-2 mb-2 outline-none focus:ring-2 focus:ring-blue-400"
                  id="description"
                  placeholder="Enter Description"
                  type="text"
                />

                <div>
                  <label htmlFor="category" className="block font-medium mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={post.category}
                    onChange={(e) =>
                      setPost((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">Upload Image</label>
                  <div className="flex items-center gap-4">
                    {image && (
                      <img
                        src={image}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <label
                      htmlFor="image"
                      className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline"
                    >
                      <FaCamera className="text-xl" />
                      <span>Choose Image</span>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-150"
                  >
                    Publish Post
                  </button>
                </div>
              </form>
            </section>
          </section>
        </main>
      )}
      <Toaster />
    </>
  );
}

export default Account;
