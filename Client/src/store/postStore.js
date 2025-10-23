import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../utils/axiosAPI";
import useUserStore from "./userStore";

const usePostStore = create((set, get) => ({
  posts: null,
  tranding: [],

  createPost: async (postDetails, img) => {
    try {
      const id = useUserStore.getState().user._id;
      const postPromise = axios.post(`/api/post/createPost/${id}`, {
        title: postDetails.title,
        description: postDetails.description,
        image: img || postDetails.image,
        type: postDetails.category,
      });

      await toast.promise(postPromise, {
        loading: "Creating post...",
        success: "Post created successfully",
        error: (err) => err?.response?.data?.message || "Something went wrong",
      });
    } catch (error) {
      console.error("Post creation failed:", error);
    }
  },

  getPosts: async () => {
    try {
      const res = await axios.get("/api/post/getAllPosts");
      const posts = res.data.posts;
      set({ posts });
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
    }
  },

  getPostByID: async () => {
    const id = useUserStore.getState().user._id;
    try {
      const res = await axios.post(`/api/post/getPostsByID/${id}`);
      set({ posts: res.data.posts });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  },

  getTranding: async () => {
    try {
      const res = await axios.get("/api/post/getTrandings");
      set({ tranding: res.data.posts });
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
    }
  },

  getCategoeyPost: async (category) => {
    if (category == "All") return get().getPosts();
    try {
      const res = await axios.post("/api/post/getPostByType", {
        type: category,
      });
      set({ posts: res.data.posts });
      toast.success(`All ${category} posts fetched successfully`);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  },

  deletePost: async (id) => {
    try {
      const deletePromise = axios.delete(`/api/post/deletePost/${id}`);

      await toast.promise(deletePromise, {
        loading: "Deleting post...",
        success: (res) => res.data.message,
        error: (err) => err?.response?.data?.message || "Something went wrong",
      });

      // Refresh posts after successful deletion
      await get().getPostByID(); // 👈 user-specific posts
    } catch (error) {
      console.error("Delete failed:", error);
    }
  },

  getPostByPostID: async (id) => {
    try {
      const res = await axios.post(`/api/post/getPostsByPostID/${id}`);
      return res.data.post; // Return the post data
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  },
}));

export default usePostStore;
