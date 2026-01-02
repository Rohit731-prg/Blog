import { create } from 'zustand';
import axios from '../utils/axiosAPI';
import toast from 'react-hot-toast';
import useUserStore from './userStore';
import usePostStore from './postStore'; // ✅ Import the correct store

const useLikeStore = create((set, get) => ({
  like: 0,

  setLike: (likeNumber) => set({ like: likeNumber }),

  addLike: async (id) => {
    const user = useUserStore.getState().user;

    if (!user?._id) {
      toast.error("You must be logged in to like posts");
      return;
    }

    try {
      const likePromise = axios.put(`/api/post/like/${id}`, {
        userId: user._id
      });

      await toast.promise(likePromise, {
        loading: "Liking post...",
        success: (res) => res.data.message,
        error: (err) => err?.response?.data?.message || "Something went wrong",
      });
      usePostStore.getState().getPostByPostID(id);
    } catch (error) {
      console.error("Like failed:", error);
    }
  }
}));

export default useLikeStore;
