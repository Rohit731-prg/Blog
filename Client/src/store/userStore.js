import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-hot-toast";
import axios from "../utils/axiosAPI";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      post: 0,

      signup: async (UserDetails) => {
        console.log(UserDetails);
        return toast
          .promise(axios.post("/api/user/signup", UserDetails), {
            loading: "Creating user...",
            success: "User created successfully",
            error: (err) =>
              err?.response?.data?.message || "Something went wrong",
          })
          .then((response) => response.data);
      },

      OTPverify: async (id, otp) => {
        console.log(id, otp);
        return toast
          .promise(
            axios.post(`/api/user/compliteRes/${id}`, {
              userOpt: otp,
            }),
            {
              loading: "Verifying user...",
              success: "User verified successfully",
              error: (err) =>
                err?.response?.data?.message || "Something went wrong",
            }
          )
          .then((response) => response.data);
      },

      logIn: async (userData) => {
          try {
            const res = axios.post("/api/user/login", {
              email: userData.email,
              password: userData.password
            });

            toast.promise(res, {
              loading: "Loading...",
              success: (res) => res.data.message || "User login successfully",
              error: (err) => err.response.data.message || "Internal Server Error"
            });

            const data = await res;
            set({ user: data.data.user, post: data.data.post });
            localStorage.setItem("adminToken", "true");
            return true;
          } catch (error) {
            console.log(error);
          }
      },

      logOut: () => {
        set({ user: null, post: 0 });
        toast.success("User logged out");
      },

      verifyAuth: async () => {
        try {
          const res = await axios.post("/api/user/verifyWithAuth");
          if (!res.data || !res.data.user) return false;
          console.log(res.data);
          set({ user: res.data.user });
          set({ post: res.data.post });
          return res.data.user;
        } catch (error) {
          console.error("Error verifying authentication:", error);
          return false;
        }
      },
    }),
    {
      name: "user-storage", // Key in localStorage
      partialize: (state) => ({ user: state.user, post: state.post }), // Only persist these fields
    }
  )
);

export default useUserStore;
