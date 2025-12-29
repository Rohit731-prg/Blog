import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useUserStore from '../store/userStore';
import { images } from '../utils/images';

function Signup() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  // Convert file to base64 when user selects an image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error('Image is required');
      return;
    }

    if (userDetails.password !== userDetails.confirmPassword) {
      toast.error('Password does not match');
      return;
    }

    const userData = {
      name: `${userDetails.firstName} ${userDetails.lastName}`,
      email: userDetails.email,
      password: userDetails.password,
      image,
    };

    const res = await useUserStore.getState().signup(userData);

    if (res) {
      navigate(`/otpcheck/${res.user._id}`);
    }
  };

  useEffect(() => {
    const random = Math.floor(Math.random() * images.length);
    setImageList(images[random]);
  }, []);

  return (
    <div className='w-full min-h-screen p-4 md:p-10 bg-gray-900 flex items-center justify-center'>
      <div className='rounded-2xl bg-zinc-800 w-full max-w-6xl flex flex-col md:flex-row overflow-hidden'>

        {/* Left Image Section */}
        <div className='w-full md:w-2/5 h-64 md:h-auto'>
          <img src={imageList} alt="" className='w-full h-full object-cover' />
        </div>

        {/* Right Form Section */}
        <main className='w-full md:w-3/5 p-6 md:p-10'>
          <p className='text-white text-2xl md:text-3xl font-semibold'>Create an account</p>
          <p className='text-gray-400 my-2 text-sm md:text-base'>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} className='underline cursor-pointer'>
              Log in
            </span>
          </p>

          <form onSubmit={handelSubmit} className="pt-6 md:pt-8">
            <div className='flex flex-col md:flex-row gap-3 md:gap-5 w-full py-2'>
              <input
                required
                value={userDetails.firstName}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, firstName: e.target.value })
                }
                className='bg-violet-300 px-4 py-2 rounded-sm outline-none w-full'
                placeholder='First Name'
                type="text"
              />
              <input
                required
                value={userDetails.lastName}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, lastName: e.target.value })
                }
                className='bg-violet-300 px-4 py-2 rounded-sm outline-none w-full'
                placeholder='Last Name'
                type="text"
              />
            </div>

            <input
              required
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              placeholder='Email'
              type="email"
              className='bg-violet-300 px-4 py-2 rounded-sm outline-none w-full my-3'
            />

            <div className='bg-violet-300 flex items-center px-4 py-2 rounded-sm'>
              <input
                required
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
                placeholder='Password'
                type={passwordShow ? 'text' : 'password'}
                className='outline-none w-full bg-transparent'
              />
              <button type='button' onClick={() => setPasswordShow(!passwordShow)}>
                {passwordShow ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className='bg-violet-300 flex items-center px-4 py-2 rounded-sm my-3'>
              <input
                required
                value={userDetails.confirmPassword}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, confirmPassword: e.target.value })
                }
                placeholder='Confirm Password'
                type={confirmPasswordShow ? 'text' : 'password'}
                className='outline-none w-full bg-transparent'
              />
              <button type='button' onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}>
                {confirmPasswordShow ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className='bg-violet-300 px-4 py-2 rounded-sm outline-none w-full my-3'
            />

            <div className='flex flex-row gap-2 w-full items-center my-4'>
              <div className='w-full h-[1px] bg-white'></div>
              <p className='text-white text-sm'>Create</p>
              <div className='w-full h-[1px] bg-white'></div>
            </div>

            <button
              type='submit'
              className='bg-violet-300 px-4 py-2 rounded-sm outline-none w-full font-semibold cursor-pointer'
            >
              Create Account
            </button>
          </form>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default Signup;