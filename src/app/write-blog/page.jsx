"use client"
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { jwtDecode } from 'jwt-decode'
import { CloudUpload } from 'lucide-react';
import uploadImg from '@/assets/uploadImg.jpeg';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function WriteBlog() {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [author, setAuthor] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setAuthor(decoded.id); // or set both if needed: setUsername(decoded.username)
        }
    }, []);

    function reset() {
        setContent("")
        setImage("")
        setTitle("")
    }

    async function handlePost() {
        const token = localStorage.getItem('token')
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('author', author);
        formData.append('image', image);

        const response = await axios.post('/api/blogs', formData);
        if (response){
            alert(response?.data?.message)
        } else{
            alert("Error")
        }

        reset();
        router.push('/')
    }

    if (!isLoggedIn) {
        return (
            <div className="w-full h-screen grid place-items-center p-4">
                <p>Please log in to access this page.</p>
            </div>
        );
    }
    // console.log(image)

    return (
        <div className='px-4 lg:px-20 py-4 '>
            <h3 className='text-2xl font-semibold'>Add Blog</h3>
            <div className='shadow-md my-4 p-4 space-y-3'>
                <div className='flex flex-col'>
                    <label className='mb-1'>Title</label>
                    <input type="text" className='border border-zinc-500 p-2 text-sm outline-none rounded-md' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                    <label className='mb-1'>Content</label>
                    <textarea rows={10} className='border border-zinc-500 p-2 text-sm outline-none rounded-md' value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className='flex flex-col cursor-pointer'>
                    <label className='mb-1' htmlFor='image'>
                        <div className='w-full h-96 border rounded-md overflow-hidden'>
                            {image ?
                                <div className='w-full h-full grid place-items-center'>
                                    <Image src={URL.createObjectURL(image)} alt='uploaded-img' height={100} width={100} className='object-cover h-full w-auto' />
                                </div> :
                                <div className='w-full h-full grid place-items-center'>
                                    <CloudUpload size={200} color='gray' />
                                    <p className='text-3xl font-semibold text-center text-gray-500'>Select File to Upload</p>
                                </div>
                            }
                        </div>
                    </label>
                    <input type="file" id='image' onChange={(e) => setImage(e.target.files[0])} className='border border-zinc-500 p-2 text-sm outline-none rounded-md' hidden/>
                </div>
                <div className='w-full'>
                    <button className='bg-red-500 text-lg font-semibold p-2 text-white w-full rounded-md cursor-pointer' onClick={handlePost}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default WriteBlog;
