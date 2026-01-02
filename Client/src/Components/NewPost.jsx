import React, { useState } from "react";
import Sidebar from "./Auth/Sidebar";
import usePostStore from "../store/postStore";
import { Toaster } from "react-hot-toast";

function NewPost() {
  const { createPost } = usePostStore();
  const [postdetails, setPost] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });
  const categories = [
    "Technology",
    "Politics",
    "Business & Finance",
    "Lifestyle",
    "Culture & Society",
  ];

  const handlelSubmit = async (e) => {
    e.preventDefault();
    console.log(postdetails);
    
    await createPost(postdetails);
    setPost({ title: "", description: "", category: "", image: null });
  };
  return (
    <main className="min-h-screen bg-[#f9f9f9] text-gray-800 font-primary">
      <Sidebar />

      <section className="ml-72 py-10 px-40">
        <p className="text-2xl font-medium">Write a New Blog</p>
        <p className="mt-1 text-xl font-normal text-gray-600">
          Turn Ideas into Words
        </p>

        <form onSubmit={handlelSubmit} className="flex flex-col mt-10">
          <label htmlFor="title" className="p-1">
            Enter Totle for your Story
          </label>
          <input
            id="title"
            value={postdetails.title}
            onChange={(e) => setPost({ ...postdetails, title: e.target.value })}
            className="px-5 py-2 rounded-sm bg-gray-200"
            placeholder="Give your story a strong title…”"
            type="text"
          />

          <label htmlFor="title" className="p-1 mt-5">
            Enter Description for your Story
          </label>
          <textArea
            value={postdetails.description}
            onChange={(e) => setPost({ ...postdetails, description: e.target.value })}
            rows={4}
            placeholder="Summarize your post in one sentence"
            className="outline-none bg-gray-200 p-2 rounded-sm"
          />

          <label htmlFor="category" 
          className="p-1 mt-5">
            Select Category for your Story
          </label>
          <select
          value={postdetails.category}
          onChange={(e) => setPost({ ...postdetails, category: e.target.value })} 
          id="category" className="px-5 py-2 rounded-sm bg-gray-200">
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <p className="p-1 mt-6">Upload Image</p>
          <label htmlFor="image" className="p-1 w-1/2">
            {postdetails.image ? (
              <div className="">
                <img src={URL.createObjectURL(postdetails.image)} alt="" />
              </div>
            ) : (
              <div className="text-gray-500 text-sm flex items-center justify-center gap-2 flex-col py-10 bg-gray-200 border border-dashed border-black rounded-lg">
                <p>Upload Image here</p>
                <p>Drag n Drop or upload image for your story</p>
              </div>
            )}
          </label>
          <input
            type="file"
            accept="image/*"
            id="image"
            className="hidden"
            onChange={(e) =>
              setPost({ ...postdetails, image: e.target.files[0] })
            }
          />

          <button
            type="submit"
            className="mt-10 py-3 rounded-full bg-blue-600 text-white "
          >
            Post New Story
          </button>
        </form>
      </section>
      <Toaster />
    </main>
  );
}

export default NewPost;
