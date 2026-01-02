import Sidebar from "./Auth/Sidebar";
import { useEffect, useState } from "react";
import useSaveStore from "../store/saveStore";
import useUserStore from "../store/userStore";
import usePostStore from "../store/postStore";
import { MdDeleteOutline } from "react-icons/md";
import swal from "sweetalert2";
import { Toaster } from "react-hot-toast";

function Save() {
  const { user } = useUserStore();
  const { getSavePost, savePosts, deletePost } = useSaveStore();
  const { getTranding, tranding } = usePostStore();
  const [search, setSearch] = useState("");
  const filterPosts = (savePosts || []).filter((post) => {
    // return post?.post?.title?.toLowercase.includes(search.toLowerCase());
  });
  const fetchData = async () => {
    await Promise.all([getSavePost(), getTranding()]);
  };

  const handelDelete = async (id) => {
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
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main className="min-h-screen bg-[#f9f9f9] text-gray-800 font-primary">
      <Sidebar />
      <main className="ml-72 py-10 px-20 flex flex-row gap-10">
        <section className="w-2/3">
          <p>Welcome back {user?.name}</p>
          <input
            className="my-5 w-80 px-5 py-2 rounded-full border-2 border-gray-500 outline-none"
            value={search}
            placeholder="Search your blog with name.."
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />

          <aside>
            <p className="text-xl font-medium mb-10">Save Posts</p>
            {savePosts ? (
              <div>
                {savePosts.map((post) => (
                  <div
                    key={post._id}
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
                            {new Date(post.post.createdAt).toLocaleDateString(
                              "en-GB",
                              { day: "2-digit", month: "long" }
                            )}
                          </p>
                        </div>
                      </div>
                      <p className="text-xl font-semibold">
                        {post.post.title}
                      </p>
                      <p className="my-3 text-sm text-gray-400">
                        {post.post.description}
                      </p>

                      <div className="mt-1 flex flex-row gap-5 items-center">
                        <p className="text-white bg-gray-600 inline-block px-3 py-1 rounded-full">
                          {post.post.type}
                        </p>
                        <button
                          onClick={() => handelDelete(post._id)}
                          className="flex flex-row gap-2 items-center px-5 py-2 rounded-full bg-red-300 text-red-700"
                        >
                           <MdDeleteOutline /> Delete
                        </button>
                      </div>
                    </section>
                    <section className="w-1/3">
                      <img
                        src={post.post.image}
                        alt=""
                        className="w-full object-cover bg-gray-400 h-full rounded-xl"
                      />
                    </section>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p>No Save Posts or stories !</p>
                <button>Explore now</button>
              </div>
            )}
          </aside>
        </section>
        <section className="w-1/3">
          <p className="mb-10 text-2xl font-medium">Tranding Posts</p>
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
                      <p className="text-xs text-gray-600">{blog.user.name}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-800 leading-snug">
                      {blog.title}
                    </p>
                  </div>
                </div>
              ))}
          </section>
        </section>
      </main>
      <Toaster />
    </main>
  );
}

export default Save;
