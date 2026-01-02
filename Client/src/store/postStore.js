import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../utils/axiosAPI";
import useCommentStore from "./commentStore";

const usePostStore = create((set, get) => ({
  posts: null,
  tranding: [],
  post: null,

  setPost: (post) => {
    set({ post });
  },

  createPost: async (postDetails) => {
    try {
      const newForm = new FormData();
      newForm.append("title", postDetails.title);
      newForm.append("description", postDetails.description);
      newForm.append("type", postDetails.category);
      newForm.append("image", postDetails.image);
      const postPromise = axios.post(`/api/post/createPost`, newForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
    try {
      const res = await axios.get(`/api/post/getPostsByID`);
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
      set({ post: res.data.post });
      useCommentStore().getState().getAllComments(id);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  },

  readPost: async (id) => {
    try {
      const response = await axios.put(`/api/post/readPost/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },

  updatePost: async (post) => {
    try {
      const response = axios.put(`/api/post/update/${post?._id}`, {
        title: post?.title,
        description: post?.description,
        type: post?.type
      });

      toast.promise(response, {
        loading: "Loading...",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message || err.message || "Internal Server Error"
      });

      await response;
      get().getPostByID()
    } catch (error) {
      console.log(error);
    }
  }
}));

export default usePostStore;
