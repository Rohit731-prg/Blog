import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../utils/axiosAPI";
import useUserStore from "./userStore";

const usePostStore = create((set, get) => ({
  posts: [],
  tranding: [],

  cratePost: async (postDetails, img) => {
    const id = useUserStore.getState().user._id;
    const res = await axios.post(`/api/post/createPost/${id}`, {
      title: postDetails.title,
      description: postDetails.description,
      image: postDetails.image,
      type: postDetails.category,
    });
    toast.promise(res, {
      loading: "Creating post...",
      success: "Post created successfully",
      error: (err) => err?.response?.data?.message || "Something went wrong",
    });
  },

  getPosts: async () => {
    try {
      const res = await axios.get("/api/post/getAllPosts");
      const posts = res.data.posts;
      set({ posts });
    } catch (error) {
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
      console.log(error);
    }
  },

  getCategoeyPost: async (category) => {
    if(category == 'All') return get().getPosts();
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
}));

export default usePostStore;
