import usePostStore from "../store/postStore";
import Sidebar from "./Auth/Sidebar";
import Lottie from "lottie-react";
import loading1 from "../assets/loading1.json";
import { useNavigate } from "react-router-dom";
import useLikeStore from "../store/likeStore";
import { useEffect, useState } from "react";
import useCommentStore from "../store/commentStore";
import { Toaster } from "react-hot-toast";
import useSaveStore from "../store/saveStore";

function Blog() {
  const navigate = useNavigate();
  const { postComment, getAllComments, comments } = useCommentStore();
  const { post, tranding, setPost, readPost } = usePostStore();
  const { addToSave } = useSaveStore();
  const { addLike } = useLikeStore();
  const [comment, setComment] = useState("");

  const navigateToBlog = (post) => {
    setPost(post);
    navigate("/blog");
  };

  const handelLike = async () => {
    await addLike(post._id);
  };

  const handelComment = async () => {
    await postComment(post?._id, comment);
    setComment("");
  };

  const fetchComments = async () => {
    await getAllComments(post._id);
    await readPost(post._id);
  };

  const handelAdd = async () => {
    await addToSave(post?._id);
  }

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <main className="min-h-screen bg-[#f9f9f9] text-gray-800 font-primary">
      <Sidebar />

      <aside className="ml-72 py-10 px-20 flex flex-row gap-40">
        <section className="w-2/3">
          <div className="flex flex-row gap-5">
            <img
              src={post.user.image}
              alt=""
              className="w-20 h-20 object-cover rounded-full"
            />
            <div>
              <p className="text-xl font-medium">{post.user.name}</p>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                })}
              </p>
            </div>
          </div>

          <img
            src={post.image}
            alt=""
            className="mt-10 w-full rounded-lg shadow-2xl shadow-black"
          />
          <p className="text-xl mt-5 font-medium">{post.title}</p>
          <p className="text-gray-600">{post.description}</p>
          <div className="flex flex-row gap-10 mt-5">
            <p className="px-10 py-2 rounded-full bg-slate-800 text-white">
              {post.type}
            </p>
            <button
              onClick={handelLike}
              className="bg-blue-700 text-white px-10 py-2 rounded-full"
            >
              Like {post.likes.length}
            </button>
            <button
              onClick={handelAdd}
              className="bg-green-700 text-white px-10 py-2 rounded-full"
            >
              Add To Save
            </button>
          </div>

          <aside className="py-10">
            <p className="mb-2 text-xl font-medium">Add Your Comment here</p>
            <div className="w-full flex flex-row bg-gray-200 shadow-md shadow-black items-center rounded-full">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your comment here..."
                className="w-full px-5 outline-none"
              />
              <button
                onClick={handelComment}
                className="px-10 py-3 bg-purple-700 text-white rounded-full"
              >
                Post
              </button>
            </div>

            <p className="p-2 text-lg font-medium text-gray-700">
              Total Comments:{" "}
              <span className="p-1 bg-black text-white rounded-full">
                {comments ? comments.length : 0}
              </span>
            </p>
            {comments &&
              comments.map((comment) => (
                <div key={comment?._id} className="py-3 border-b-2 border-gray-500">
                  <div className="flex flex-row gap-2">
                    <img
                      src={comment.user.image}
                      alt=""
                      className="w-8 h-8 object-cover rounded-full"
                    />
                    <div className="text-sm">
                      <p className="font-normal">{comment.user.name}</p>
                      <p className="text-gray-500 text-[10px]">
                        {comment.createdAt.split("T")[0]}
                      </p>
                    </div>
                  </div>
                  <p className="mt-1 ">{comment.content}</p>
                </div>
              ))}
          </aside>
        </section>
        <section className="w-1/2">
          <p className="text-2xl font-medium underline mb-6">
            Explore More Blogs
          </p>
          {tranding ? (
            <>
              {tranding.map((blog) => (
                <div
                  key={blog?._id}
                  className="p-2 border-b-2 border-gray-600"
                  onClick={() => navigateToBlog(blog)}
                >
                  <div className="flex flex-row gap-3">
                    <img
                      src={blog.user.image}
                      alt=""
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div>
                      <p className="text-sm ">{blog.user.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </div>
                  <img
                    src={blog.image}
                    alt=""
                    className="rounded-sm mt-2 w-60 h-40 object-cover"
                  />
                  <p className="text-lg font-medium mt-1">
                    {blog.title.length < 20
                      ? blog.title
                      : blog.title.slice(0, 20) + "..."}
                  </p>
                  <p className="text-sm text-gray-600">
                    {blog.description.length < 50
                      ? blog.description
                      : blog.description.slice(0, 50) + "..."}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <div className="h-full">
              <Lottie animationData={loading1} loop />
            </div>
          )}
        </section>
      </aside>
      <Toaster />
    </main>
  );
}

export default Blog;
