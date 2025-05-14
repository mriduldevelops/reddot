"use client"
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Blog() {
    const { id } = useParams();
    // console.log(id)

    const [blog, setBlog] = useState(null)
    const [username, setUsername] = useState("")

    useEffect(() => {
        async function fetchBlog() {
            try {
                const response = await axios.get(`/api/blog-details/${id}`)
                // console.log(response)
                setBlog(response.data)

            } catch (error) {
                console.log(error)
            }

        }

        if (id) fetchBlog();
    }, [id])

    useEffect(()=>{
        async function fetchUser() {
            try {
                const response = await axios.get(`/api/user-details/${blog.author}`)
                // console.log(response.data)
                setUsername(response.data.username)

            } catch (error) {
                console.log(error)
            }

        }

        if (blog?.author) fetchUser();

    },[blog])
    // console.log(blog)

    if (!blog){
        return(
            <div className='w-screen h-screen grid place-items-center'>
                <h3 className='text-2xl font-bold'>Loading...</h3>
            </div>
        )
    }
    return (
        <div className='w-full px-4 lg:px-20 py-10'>
            <div>
                <p className='text-3xl font-semibold mb-5 italic'>{blog?.title}</p>
            </div>
            <div className='w-full min-h-60 overflow-hidden grid place-items-center'>
                {blog?.image?<Image src={blog?.image} alt='image' width={100} height={100} className='w-auto h-full object-cover'/>:<p>No image</p>}
            </div>
            <div className='mt-10'>

                <p className='text-sm tracking-wider text-zinc-800'>{blog?.content}</p>

                <p className='font-semibold text-lg italic text-center mt-5'>-{username}</p>

            </div>
        </div>
    )
}

export default Blog