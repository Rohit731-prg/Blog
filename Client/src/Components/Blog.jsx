import React, { useEffect } from 'react'
import Navber from './Navber'
import { useState } from 'react';
import usePostStore from '../store/postStore';
import { useParams } from 'react-router-dom';
import { FcLike } from "react-icons/fc";
import useLikeStore from '../store/likeStore';

function Blog() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    
    useEffect(async () => {
        const post = await usePostStore.getState().getPostByPostID(id);
        setPost(post);
    }, []);

    const addLike = (postId) => {
        useLikeStore.getState().addLike(postId);
        window.location.reload();
    }

  return (
    <main>
        <Navber />

       {post ? (
        <div className='mt-40 px-30 font-primary'>
            <h2 className='text-4xl font-semibold mb-5'>{post.title}</h2>
            <p className='mb-5 text-xl text-gray-500'>{post.description}</p>

            <img src={post.image} alt="" className='w-full rounded-sm border-b-2 border-gray-700' />
            <div className='flex justify-between items-center my-3'>
                <p className='font-semibold text-gray-400 bg-gray-700 px-5 py-1 rounded-full'>{post.type}</p>
                <button 
                onClick={() => addLike(post._id)}
                className='flex items-center gap-1 px-3 py-1 rounded-sm bg-red-300'><FcLike /> {post.likes}</button>
            </div>
            <div className='flex items-center gap-3 mt-5'>
                <img src={post.user.image} alt="" className='w-14 h-14 rounded-full object-cover' />
                <div>
                    <p className='text-xl font-semibold'>{post.user.name}</p>
                    <p className='text-sm text-gray-500'>{new Date(post.updatedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long" })}</p>
                </div>
            </div>
        </div>
       ) : (
        <div>
          <p>No post selected</p>
        </div>
       )}
    </main>
  )
}

export default Blog