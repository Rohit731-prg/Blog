import { create } from 'zustand'
import toast from 'react-hot-toast';
import api from '../utils/axiosAPI';

const useCommentStore = create((set, get) => ({
  comments: null,

  postComment: async (id, comment) => {
    try {
        console.log(id, comment)
        const response = api.post(`/api/comment/postComment/${id}`, {
            comment
        });
        toast.promise(response, {
            loading: "Loading..!",
            success: (res) => res.data.message || "comment posted successfully..!",
            error: (err) => err.response.data.message || err.message || "Internal Server error"
        });

        await response;
        get().getAllComments(id);
    } catch (error) {
        console.log(error);
    }
  },

  getAllComments: async (id) => {
    try {
        const response = await api.get(`/api/comment/getComments/${id}`);
        console.log(response);
        set({ comments: response.data.comments });
    } catch (error) {
        console.log(error);
        set({ comments: null });
        // toast.error(error.response.data.message);
    }
  },

  setCommentNull: () => set({ comments: null })
}));

export default useCommentStore;
