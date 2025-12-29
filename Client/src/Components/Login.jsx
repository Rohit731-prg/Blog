import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { Toaster } from "react-hot-toast";
import { images } from "../utils/images";

function Login() {
  const { logIn } = useUserStore(); 
  const navigate = useNavigate();
  const [imageList, setImageList] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await logIn(details);
    if (res) {
      navigate(`/home`);
    }
  };

  useEffect(() => {
    const init = async () => {
      const user = await useUserStore.getState().verifyAuth();
      console.log(user);
      if (user) {
        navigate(`/profile`);
      }

      if (images.length > 0) {
        const random = Math.floor(Math.random() * images.length);
        setImageList(images[random]);
      }
    };

    init();
  }, [navigate, images]);

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 sm:px-6 lg:px-12">
        <div className="w-full max-w-5xl bg-zinc-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Left Image Section */}
          <div className="hidden md:block">
            <img
              src={imageList}
              alt="Login Visual"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right Form Section */}
          <main className="p-6 sm:p-10 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome Back 👋
            </h1>
            <p className="text-gray-400 mb-8">
              Login to continue to your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <input
                value={details.email}
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                placeholder="Email address"
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-violet-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />

              {/* Password */}
              <div className="flex items-center px-4 py-3 rounded-xl bg-violet-100">
                <input
                  value={details.password}
                  onChange={(e) =>
                    setDetails({ ...details, password: e.target.value })
                  }
                  placeholder="Password"
                  type={passwordShow ? "text" : "password"}
                  className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setPasswordShow(!passwordShow)}
                  className="text-gray-600 ml-2"
                >
                  {passwordShow ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Forgot */}
              <div className="text-right">
                <span
                  onClick={() => navigate("/forgatePass")}
                  className="text-sm text-sky-400 cursor-pointer hover:underline"
                >
                  Forgot Password?
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold py-3 rounded-xl transition"
              >
                Login
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/20" />
                <span className="text-gray-400 text-sm">OR</span>
                <div className="flex-1 h-px bg-white/20" />
              </div>

              {/* Signup */}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition"
              >
                Create New Account
              </button>
            </form>
          </main>
        </div>

        <Toaster />
      </div>
    </>
  );
}

export default Login;
